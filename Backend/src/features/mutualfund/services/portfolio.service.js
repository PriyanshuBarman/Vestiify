import { userPortfolioRepo } from "../../../shared/repositories/index.repository.js";
import { ApiError } from "../../../utils/apiError.utils.js";
import { portfolioRepo } from "../repositories/index.repository.js";

//prettier-ignore
export const fetchPortfolio = async ({ userId, fundType, sort_by = "createdAt", order_by = "desc" }) => {
  return await portfolioRepo.findMany(
    { userId, fundType },
    { orderBy: { [sort_by]: order_by } }
  );
};

export const fetchFund = async (userId, fundCode) => {
  const fund = await portfolioRepo.findUnique({
    userId_fundCode: { userId, fundCode },
  });

  if (!fund) throw new ApiError(404, "Fund not found in portfolio.");
};

export const fetchPortfolioSummary = async (userId) => {
  return await userPortfolioRepo.findUnique({
    userId_portfolioType: { userId, portfolioType: "MF" },
  });
};
