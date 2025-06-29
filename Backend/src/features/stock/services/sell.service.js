import { tnxRepo, walletRepo } from "../../../shared/repositories/index.repository.js";
import { ApiError } from "../../../utils/apiError.utils.js";
import { holdingRepo, portfolioRepo } from "../repositories/index.repository.js";
import { calculateUpdatedPortfolio } from "../utils/sell.utils.js";
import { fifoRedemption } from "./fifo.service.js";

export const sellAllQty = async (userId, symbol, price) => {
  const prev = await portfolioRepo.findUnique({ userId_symbol: { userId, symbol } });

  if (!prev) throw new ApiError(404, "Stock Not Found");

  const amount = prev.quantity * price; // sellingAmount

  await tnxRepo.create({
    userId,
    price,
    amount,
    code: prev.symbol,
    name: prev.stockName,
    quantity: prev.quantity,
    assetType: "STOCK",
    tnxType: "SELL",
  });
  await portfolioRepo.delete({ id: prev.id });
  await holdingRepo.deleteMany({ userId, symbol });
  await walletRepo.creditBalance(userId, amount);
};

export const sellSomeQty = async (userId, symbol, price, quantity) => {
  const prev = await portfolioRepo.findUnique({ userId_symbol: { userId, symbol } });

  // ----------------------------------------------------------------------------------------- Validations
  if (!prev) throw new ApiError(404, "Stock Not Found");

  if (quantity > prev.quantity)
    throw new ApiError(400, "quantity shouldn't be greater than available qty");

  if (quantity === prev.quantity) return sellAllQty(userId, symbol);
  // -----------------------------------------------------------------------------------------// Validations

  const amount = quantity * price; // sellingAmount
  const costBasis = await fifoRedemption(userId, symbol, quantity);

  const updatedValues = calculateUpdatedPortfolio(prev, costBasis, quantity, price);

  await portfolioRepo.update({ id: prev.id }, updatedValues);
  await walletRepo.creditBalance(userId, amount);
  await tnxRepo.create({
    userId,
    price,
    amount,
    quantity,
    code: prev.symbol,
    name: prev.stockName,
    assetType: "STOCK",
    tnxType: "SELL",
  });
};
