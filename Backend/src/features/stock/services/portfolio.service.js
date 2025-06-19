import { userPortfolioRepo } from "../../../shared/repositories/userPortfolio.repository.js";
import { ApiError } from "../../../utils/apiError.utils.js";
import { portfolioRepo } from "../repositories/portfolio.repository.js";

export const fetchPortfolio = async (userId, sort_by, order_by) => {
  const portfolio = await portfolioRepo.findMany(
    { userId },
    { orderBy: { [sort_by]: order_by } }
  );

  if (!portfolio.length) throw new ApiError(400, "Not invested in any stock");

  return portfolio;
};

export const fetchStock = async (userId, symbol) => {
  console.log(userId, symbol);
  const stock = await portfolioRepo.findUnique({ userId_symbol: { userId, symbol } });

  if (!stock) throw new ApiError(400, "Stock Not Found in Portfolio");

  return stock;
};

export const fetchPortfolioSummary = async (userId) => {
  const portfolio = await userPortfolioRepo.findUnique({
    userId_portfolioType: { userId, portfolioType: "STOCK" },
  });

  if (!portfolio) throw new ApiError(400, "Not invested in any fund");

  return portfolio;
};
