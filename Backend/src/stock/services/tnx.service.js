import { tnxRepo } from "../../shared/repositories/tnx.repository.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const fetchPortfolioTnx = async (userId) => {
  const tnx = await tnxRepo.findMany(
    { userId, assetType: "STOCK" },
    { orderBy: { createdAt: "desc" } }
  ); // shared

  if (!tnx) throw new ApiError(404, "No transactions found");

  return tnx;
};

export const fetchStockTnx = async (userId, symbol) => {
  const stockTnx = await tnxRepo.findMany({ userId, code: symbol });

  if (!stockTnx.length) throw new ApiError(404, "No transactions found");

  return stockTnx;
};
