import { tnxRepo } from "../../../shared/repositories/index.repository.js";
import { ApiError } from "../../../shared/utils/apiError.utils.js";

export const fetchPortfolioTnx = async (userId) => {
  const tnx = await tnxRepo.findMany(
    { userId, assetType: "MF" },
    { orderBy: { createdAt: "desc" } }
  ); // shared

  if (!tnx.length) throw new ApiError(404, "No transactions found");
  return tnx;
};

export const fetchFundTnx = async (userId, fundCode) => {
  const tnx = await tnxRepo.findMany({ userId, code: fundCode });

  if (!tnx.length) throw new ApiError(404, `No transactions found for ${fundCode}`);
  return tnx;
};
