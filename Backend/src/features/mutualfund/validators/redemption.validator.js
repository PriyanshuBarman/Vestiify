import { ApiError } from "../../../shared/utils/apiError.utils.js";

export const validatePartialRedemption = (req, res, next) => {
  const { schemeCode } = req.params;
  const { redemptionAmt } = req.body;

  if (!schemeCode) throw new ApiError(400, "schemeCode required");
  if (isNaN(schemeCode)) throw new ApiError(400, "invalid schemeCode");

  if (!redemptionAmt) throw new ApiError(400, "redemptionAmt required");

  if (isNaN(redemptionAmt) || redemptionAmt <= 0) throw new ApiError(400, "invalid redemptionAmt");

  next();
};

export const validateFullRedemption = (req, res, next) => {
  const { schemeCode } = req.params;

  if (!schemeCode) throw new ApiError(400, "schemeCode required");
  if (isNaN(schemeCode)) throw new ApiError(400, "invalid schemeCode");
  next();
};
