import {
  tnxRepo,
  walletRepo,
} from "../../src/shared/repositories/index.repository.js";
import { fifoRedemption } from "../../src/mutualfund/services/fifo.service.js";
import { db } from "../../config/db.config.js";
import {
  holdingRepo,
  orderRepo,
  portfolioRepo,
} from "../../src/mutualfund/repositories/index.repository.js";
import { fetchFundData } from "../external/fetchFundData.js";
import { fetchNavByDate } from "../external/fetchNavByDate.js";
import {
  calcPortfolioAfterInvestment,
  calcPortfolioAfterRedemption,
} from "../../src/mutualfund/utils/calculateUpdatedPortfolio.utils.js";
import { getMainDomain } from "../utils/getMainDomain.utils.js";

export const processInvestmentOrder = async (orderData) => {
  let {
    id: orderId,
    userId,
    schemeCode,
    fundName,
    amount,
    navDate,
  } = orderData;
  amount = amount.toNumber();

  const prevInv = await portfolioRepo.findUnique({
    userId_schemeCode: { userId, schemeCode },
  });

  const nav = await fetchNavByDate(schemeCode, navDate);
  const units = amount / nav;

  // Fetch fundData only if needed
  let fundData;
  if (!prevInv) {
    fundData = await fetchFundData(schemeCode);
  }

  //  Prisma transaction
  await db.$transaction(async (tx) => {
    let portfolioId = prevInv?.id;

    if (!prevInv) {
      const newPortfolio = await portfolioRepo.create(
        {
          userId,
          schemeCode,
          fundName,
          fundType: fundData.fund_type.toUpperCase(),
          units,
          current: amount,
          invested: amount,
          website: getMainDomain(fundData.detail_info),
          shortName: fundData.short_name,
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

      const updatedBalance = await walletRepo.creditBalance(
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

      const updatedBalance = await walletRepo.creditBalance(userId, amount, tx);

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
