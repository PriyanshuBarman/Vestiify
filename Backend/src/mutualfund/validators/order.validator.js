import { ApiError } from "../../shared/utils/apiError.utils.js";

export const validateInvestmentOrder = (req, res, next) => {
  const { amount, schemeCode, fundName, fundCategory } = req.body;

  if (!schemeCode || schemeCode === "") {
    throw new ApiError(400, "Scheme code is required");
  }

  if (!fundName || fundName === "") {
    throw new ApiError(400, "fundName is required");
  }
  if (!fundCategory) {
    throw new ApiError(400, "fundCategory is required");
  }

  if (!amount || amount <= 0 || isNaN(amount)) {
    throw new ApiError(400, "Invalid amount");
  }

  next();
};

export const validateRedemptionOrder = (req, res, next) => {
  const { amount, fundId } = req.body;

  if (!fundId || fundId !== "") {
    throw new ApiError(400, "fundId required");
  }

  if (!amount) {
    throw new ApiError(400, "amount required");
  }
  if (isNaN(amount) || amount <= 0) {
    throw new ApiError(400, "invalid amount");
  }

  next();
};
