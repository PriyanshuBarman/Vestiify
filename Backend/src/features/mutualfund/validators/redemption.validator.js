import { ApiError } from "../../../shared/utils/apiError.utils.js";

export const validatePartialRedemption = (req, res, next) => {
  const { fundCode } = req.params;
  const { redemptionAmt } = req.body;

  if (!fundCode) throw new ApiError(400, "fundCode required");

  if (!redemptionAmt) throw new ApiError(400, "redemptionAmt required");

  if (isNaN(redemptionAmt) || redemptionAmt <= 0) throw new ApiError(400, "invalid redemptionAmt");

  next();
};

export const validateFullRedemption = (req, res, next) => {
  const { fundCode } = req.params;

  if (!fundCode) throw new ApiError(400, "fundCode required");

  next();
};
