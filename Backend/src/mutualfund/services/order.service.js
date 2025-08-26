import { db } from "../../../config/db.config.js";
import {
  walletRepo,
  tnxRepo,
} from "../../shared/repositories/index.repository.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import { orderRepo } from "../repositories/order.repository.js";
import { portfolioRepo } from "../repositories/portfolio.repository.js";
import {
  getNavAndProcessDateForInvestment,
  getNavAndProcessDateForRedemption,
} from "../utils/getNavAndProcessDate.utiils.js";
import { instantRedemption } from "./instaRedeem.service.js";

export const placeInvestmentOrder = async ({
  userId,
  amount,
  schemeCode,
  fundName,
  fundCategory,
  sipId, // Optional
}) => {
  const balance = await walletRepo.checkBalance(userId);

  if (amount > balance) {
    throw new ApiError(400, "Insufficient wallet balance");
  }

  const { processDate, navDate } =
    getNavAndProcessDateForInvestment(fundCategory);

  // prisma $transaction
  await db.$transaction(async (tx) => {
    const order = await orderRepo.create(
      {
        userId,
        amount,
        schemeCode,
        fundName,
        processDate,
        navDate,
        method: sipId ? "SIP" : "REGULAR",
        orderType: sipId ? "NEW_SIP" : "ONE_TIME",
        sipId: sipId || null,
      },
      tx
    );

    const updatedBalance = await walletRepo.debitBalance(userId, amount, tx);

    await tnxRepo.create(
      {
        userId,
        amount,
        mfOrderId: order.id,
        tnxType: "DEBIT",
        updatedBalance,
      },
      tx
    );
  });
};

export const placeRedemptionOrder = async (
  userId,
  amount,
  fundId,
  isInstant
) => {
  const fund = await portfolioRepo.findUnique({
    fundId,
  });

  if (!fund) {
    throw new ApiError(404, "Fund not found in user's portfolio");
  }
  if (amount > fund.current.toNumber()) {
    throw new ApiError(400, "Insufficient fund balance");
  }

  const isFullRedemption = amount === fund.current.toNumber();
  // const isFullRedemption = false;

  const { processDate, navDate } = getNavAndProcessDateForRedemption();

  // is insta redemption
  if (isInstant) {
    return await instantRedemption(fund);
  }

  await orderRepo.create({
    userId,
    schemeCode: fund.schemeCode,
    fundName: fund.fundName,
    method: "REGULAR",
    orderType: "REDEEM",
    amount: !isFullRedemption ? amount : null, // Store amount for partial-redemption
    units: isFullRedemption ? fund.units.toNumber() : null, // Store total units for full-redemption
    processDate,
    navDate,
  });
};

export const getOrders = async (userId) => {
  const orders = await orderRepo.findMany(
    { userId },
    {
      orderBy: {
        createdAt: "desc",
      },
    }
  );

  if (!orders.length) {
    throw new ApiError(404, "No orders found");
  }

  return orders;
};
