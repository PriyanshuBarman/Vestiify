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

  const prevInv = await portfolioRepo.findUnique({
    userId_schemeCode: { userId, schemeCode },
  });

  const nav = await fetchNavByDate(schemeCode, navDate);
  const units = amount / nav;

  //  Prisma transaction
  await db.$transaction(async (tx) => {
    let portfolioId = prevInv?.id;

    if (!prevInv) {
      const newPortfolio = await portfolioRepo.create(
        {
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
        tx
      );

      portfolioId = newPortfolio.id;
    } else {
      const updatedValues = calcPortfolioAfterInvestment(
        prevInv,
        amount,
        units
      );
      await portfolioRepo.update({ id: prevInv.id }, updatedValues, tx);
    }

    await holdingRepo.create(
      {
        nav,
        units,
        userId,
        amount,
        schemeCode,
        portfolioId,
      },
      tx
    );

    await orderRepo.update(
      { id: orderId },
      {
        status: "COMPLETED",
        nav,
        units,
      },
      tx
    );
  });
};

export const processRedemptionOrder = async (orderData) => {
  let { id: orderId, userId, schemeCode, amount, units, navDate } = orderData;
  amount = amount.toNumber();

  const fund = await portfolioRepo.findUnique({
    userId_schemeCode: { userId, schemeCode },
  });

  // -------------------- validations
  if (fund.current.toNumber() === 0) {
    await portfolioRepo.delete({ id: fund.id });
  }

  if (!fund) {
    return await db.$transaction(async (tx) => {
      await orderRepo.update(
        { id: orderId },
        {
          status: "FAILED",
          failureReason: "Fund not available in your portfolio.",
        },
        tx
      );
    });
  }

  if (amount > fund.current.toNumber()) {
    return await orderRepo.update(
      { id: orderId },
      {
        status: "FAILED",
        failureReason: "Fund don’t have enough units",
      }
    );
  }
  // ---------------------------// validations

  const nav = await fetchNavByDate(schemeCode, navDate);

  await db.$transaction(async (tx) => {
    // if there is units that means it's full redemption else partial
    if (units) {
      await portfolioRepo.delete(
        { userId_schemeCode: { userId, schemeCode } },
        tx
      );

      await orderRepo.update(
        { id: orderId },
        {
          status: "COMPLETED",
          nav,
        }
      );

      const updatedBalance = await userRepo.creditBalance(
        userId,
        fund.current.toNumber(),
        tx
      );

      await tnxRepo.create(
        {
          userId,
          amount: fund.current.toNumber(),
          mfOrderId: orderId,
          tnxType: "CREDIT",
          updatedBalance,
        },
        tx
      );
    } else {
      // partial-redemption
      const units = amount / nav; // Redemption Units
      const costBasis = await fifoRedemption(userId, schemeCode, units, tx);

      await portfolioRepo.update(
        { userId_schemeCode: { userId, schemeCode } },
        calcPortfolioAfterRedemption(fund, costBasis, amount, units),
        tx
      );

      const updatedBalance = await userRepo.creditBalance(userId, amount, tx);

      await orderRepo.update(
        { id: orderId },
        {
          status: "COMPLETED",
          nav,
          units,
        }
      );

      await tnxRepo.create(
        {
          userId,
          amount,
          mfOrderId: orderId,
          tnxType: "CREDIT",
          updatedBalance,
        },
        tx
      );
    }
  });
};
