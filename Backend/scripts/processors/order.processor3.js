import { db } from "../../config/db.config.js";
import {
  holdingRepo,
  orderRepo,
  portfolioRepo,
} from "../../src/mutualfund/repositories/index.repository.js";
import { fifoRedemption } from "../../src/mutualfund/services/fifo.service.js";
import {
  calcPortfolioAfterInvestment,
  calcPortfolioAfterRedemption,
} from "../../src/mutualfund/utils/calculateUpdatedPortfolio.utils.js";
import {
  tnxRepo,
  userRepo,
} from "../../src/shared/repositories/index.repository.js";
import { fetchNavByDate } from "../external/fetchNavByDate.js";

export const processInvestmentOrder = async (orderData) => {
  let {
    id: orderId,
    userId,
    schemeCode,
    fundName,
    amount,
    navDate,
    fundType,
    fundHouseDomain,
    shortName,
  } = orderData;
  amount = amount.toNumber();

  const nav = await fetchNavByDate(schemeCode, navDate);
  const units = amount / nav;

  //  Prisma transaction
  await db.$transaction(async (tx) => {
    const prevInv = await tx.mfPortfolio.findUnique({
      where: {
        userId_schemeCode: { userId, schemeCode },
      },
    });

    let portfolioId = prevInv?.id;

    // 1. Create new portfolio if first investment
    if (!prevInv) {
      const newPortfolio = await tx.mfPortfolio.create({
        data: {
          userId,
          schemeCode,
          fundName,
          shortName,
          fundType,
          units,
          current: amount,
          invested: amount,
          fundHouseDomain,
        },
      });

      portfolioId = newPortfolio.id;
    } else {
      // 2. Update portfolio if subsequent investment
      const updatedValues = calcPortfolioAfterInvestment(
        prevInv,
        amount,
        units
      );
      await tx.mfPortfolio.update({
        where: { id: prevInv.id },
        data: updatedValues,
      });
    }

    // 3. Create holding
    await tx.mfHolding.create({
      data: {
        nav,
        units,
        userId,
        amount,
        schemeCode,
        portfolioId,
      },
    });

    // 4. Mark the order as completed with units and NAV
    await tx.mfOrder.update({
      where: { id: orderId },
      data: {
        status: "COMPLETED",
        nav,
        units,
      },
    });
  });
};

// Redemption Order
export const processRedemptionOrder = async (orderData) => {
  let { id: orderId, userId, schemeCode, amount, units, navDate } = orderData;
  amount = amount.toNumber();

  const fund = await db.mfPortfolio.findUnique({
    where: {
      userId_schemeCode: { userId, schemeCode },
    },
  });

  // -------------------- Validations
  if (fund.current.toNumber() === 0) {
    await tx.mfPortfolio.delete({
      where: { id: fund.id },
    });
  }

  if (!fund) {
    return await db.$transaction(async (tx) => {
      await tx.mfOrder.update({
        where: { id: orderId },
        data: {
          status: "FAILED",
          failureReason: "Fund not available in your portfolio.",
        },
      });
    });
  }

  if (amount > fund.current.toNumber()) {
    return await db.$transaction(async (tx) => {
      await tx.mfOrder.update({
        where: { id: orderId },
        data: {
          status: "FAILED",
          failureReason: "Fund don’t have enough units",
        },
      });
    });
  }
  // ---------------------------// Validations

  const nav = await fetchNavByDate(schemeCode, navDate);

  await db.$transaction(async (tx) => {
    // if there is units that means it's full redemption else partial
    if (units) {
      await tx.mfPortfolio.delete({
        where: { id: fund.id },
      });

      await tx.mfOrder.update({
        where: { id: orderId },
        data: {
          status: "COMPLETED",
          nav,
        },
      });

      const user = await tx.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: fund.current.toNumber(),
          },
        },
      });

      await tx.transaction.create({
        data: {
          userId,
          amount,
          assetCategory: "MUTUAL_FUND",
          assetOrderId: orderId,
          type: "CREDIT",
          updatedBalance: user.balance,
        },
      });
    } else {
      // partial-redemption
      const units = amount / nav; // Redemption Units
      const costBasis = await fifoRedemption(userId, schemeCode, units, tx);

      await tx.mfPortfolio.update({
        where: { id: fund.id },
        data: calcPortfolioAfterRedemption(fund, costBasis, amount, units),
      });

      const user = await tx.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      await tx.mfOrder.update({
        where: { id: orderId },
        data: {
          status: "COMPLETED",
          nav,
          units,
        },
      });

      await tx.transaction.create({
        data: {
          userId,
          amount,
          assetCategory: "MUTUAL_FUND",
          assetOrderId: orderId,
          type: "CREDIT",
          updatedBalance: user.balance,
        },
      });
    }
  });
};
