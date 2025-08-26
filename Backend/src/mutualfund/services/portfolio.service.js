import { ApiError } from "../../shared/utils/apiError.utils.js";
import { portfolioRepo } from "../repositories/index.repository.js";
import { formatPortfolio } from "../utils/formatPortfolio.utils.js";

export const fetchPortfolio = async (data) => {
  const { userId, fundType, sort_by = "current", order_by = "desc" } = data;

  const portfolio = await portfolioRepo.findMany(
    { userId, fundType },
    { orderBy: { [sort_by]: order_by } }
  );

  if (!portfolio.length) {
    throw new ApiError(404, "No portfolio found.");
  }

  return formatPortfolio(portfolio);
};

export const fetchFund = async (userId, fundCode) => {
  const fund = await portfolioRepo.findUnique({
    userId_fundCode: { userId, fundCode },
  });

  if (!fund) throw new ApiError(404, "Fund not found in portfolio.");

  return formatPortfolio(fund);
};

export const fetchPortfolioSummary = async (userId) => {
  const result = await portfolioRepo.getPortfolioSummary(userId);

  if (!result._sum.invested) {
    throw new ApiError(404, "No portfolio found.");
  }

  const current = result._sum.current?.toNumber();
  const invested = result._sum.invested?.toNumber();
  const pnl = result._sum.pnl?.toNumber();
  const dayChangeValue = result._sum.dayChangeValue?.toNumber();

  const returnPercent = (pnl / invested) * 100;
  const prevCurrent = current - dayChangeValue;
  const dayChangePercent = (dayChangeValue / prevCurrent) * 100;

  return {
    current,
    invested,
    pnl,
    returnPercent,
    dayChangeValue,
    dayChangePercent,
  };
};
