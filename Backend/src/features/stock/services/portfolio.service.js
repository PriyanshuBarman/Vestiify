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
  const stock = await portfolioRepo.findUnique({ userId_symbol: { userId, symbol } });

  if (!stock) throw new ApiError(400, "Stock Not Found in Portfolio");

  return stock;
};

export const fetchPortfolioSummary = async (userId) => {
  const result = await portfolioRepo.getPortfolioSummary(userId);
  const { current, invested, pnl, dayChangeValue } = result._sum;

  const returnPercent = (pnl / current) * 100;

  return { current, invested, pnl, returnPercent, dayChangeValue };
};
