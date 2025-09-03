import {
  tnxRepo,
  userRepo,
} from "../../shared/repositories/index.repository.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import {
  holdingRepo,
  portfolioRepo,
} from "../repositories/index.repository.js";
import { calculateUpdatedPortfolio } from "../utils/purchase.utils.js";

// Handles both Fresh & Re investment

export const processPurchase = async (data) => {
  const { userId, symbol, stockName, price, quantity } = data;

  const balance = await userRepo.checkBalance(userId);

  const invested = quantity * price;

  if (invested > balance)
    throw new ApiError(400, "Insufficient wallet balance");

  const prevInv = await portfolioRepo.findUnique({
    userId_symbol: { userId, symbol },
  });

  // ------------------------------------------------------- Checking it's Fresh or Re investment
  if (!prevInv) {
    await portfolioRepo.create({
      userId,
      symbol,
      stockName,
      quantity,
      invested: invested,
      current: invested,
      // latestPrice: price,
    });
  } else {
    const updatedValues = calculateUpdatedPortfolio(
      prevInv,
      invested,
      quantity
    );
    await portfolioRepo.update({ id: prevInv.id }, updatedValues);
  }
  // ---------------------------------------------------------------------------------------------

  // Below are the Common Post-investment operations for both (Fresh or Re investment)
  await tnxRepo.create({
    userId,
    price,
    quantity,
    code: symbol,
    tnxType: "BUY",
    assetType: "STOCK",
    amount: invested,
    name: stockName,
  }); // shared

  await holdingRepo.create({
    userId,
    price,
    symbol,
    quantity,
    stockName,
    amount: invested,
  });

  await userRepo.debitBalance(userId, invested); // shared
};
