import { ApiError } from "../../shared/utils/apiError.utils.js";

export const validateWatchlist = (req, res, next) => {
  const { schemeCode, fundName, shortName, fundHouseDomain } = req.body;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }
  if (!fundName) {
    throw new ApiError(400, "fundName is required");
  }
  if (!shortName) {
    throw new ApiError(400, "shortName is required");
  }
  if (!fundHouseDomain) {
    throw new ApiError(400, "fundHouseDomain is required");
  }

  next();
};
