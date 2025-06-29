import { ApiError } from "../../../utils/apiError.utils.js";
import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import * as portfolioService from "../services/portfolio.service.js";

export const getPortfolio = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sort_by, order_by } = req.query;

  const portfolio = await portfolioService.fetchPortfolio(userId, sort_by, order_by);

  return res.status(200).json({ success: true, sort_by, order_by, portfolio });
});

export const getStock = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { symbol } = req.params;

  if (!symbol) throw new ApiError(400, "symbol is required");

  const stock = await portfolioService.fetchStock(userId, symbol);

  return res.status(200).json({ success: true, stock });
});

export const getUserPortfolio = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const portfolio = await portfolioService.fetchPortfolioSummary(userId);

  return res.status(200).json({ success: true, portfolio });
});
