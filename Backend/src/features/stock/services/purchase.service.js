import { tnxRepo, walletRepo } from "../../../shared/repositories/index.repository.js";
import { addToUserPortfolio } from "../../../shared/services/userPortfolio.service.js";
import { ApiError } from "../../../utils/apiError.utils.js";
import { holdingRepo, portfolioRepo } from "../repositories/index.repository.js";
import { calculateUpdatedPortfolio } from "../utils/purchase.utils.js";

// Handles both Fresh & Re investment

export const processPurchase = async (data) => {
  const { userId, symbol, stockName, price, quantity } = data;

  const balance = await walletRepo.checkBalance(userId);

  const invested = quantity * price;

  if (invested > balance) throw new ApiError(400, "Insufficient wallet balance");

  const prevInv = await portfolioRepo.findUnique({ userId_symbol: { userId, symbol } });

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
    const updatedValues = calculateUpdatedPortfolio(prevInv, invested, quantity);
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

  await addToUserPortfolio({ userId, invested, portfolioType: "STOCK" }); // shared

  await walletRepo.debitBalance(userId, invested); // shared
};
