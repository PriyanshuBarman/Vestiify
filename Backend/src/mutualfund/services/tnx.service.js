import { tnxRepo } from "../../shared/repositories/index.repository.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const fetchPortfolioTnx = async (userId) => {
  const tnx = await tnxRepo.findMany(
    { userId },
    {
      include: { assetOrder: true },
      orderBy: { createdAt: "desc" },
    }
  ); // shared

  if (!tnx.length) {
    throw new ApiError(404, "No transactions found");
  }
  return tnx;
};

export const fetchFundTnx = async (userId, fundCode) => {
  const tnx = await tnxRepo.findMany(
    { userId, code: fundCode },
    {
      include: { assetOrder: true },
      orderBy: { createdAt: "desc" },
    }
  );

  if (!tnx.length) {
    throw new ApiError(404, `No transactions found for ${fundCode}`);
  }
  return tnx;
};
