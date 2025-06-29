import { ApiError } from "../../../shared/utils/apiError.utils.js";

export const validateInvestment = (req, res, next) => {
  const { investmentAmt } = req.body;

  const requiredFields = [
    "investmentAmt",
    "fundCode",
    "fundName",
    "purchaseNav",
    "fundType",
    "logoCode",
    "shortName",
  ];

  for (const field of requiredFields) {
    if (!req.body[field] || req.body[field] == "") {
      throw new ApiError(400, `${field} is required`);
    }
  }

  if (
    !investmentAmt ||
    investmentAmt <= 0 ||
    typeof investmentAmt !== "number" ||
    isNaN(investmentAmt)
  )
    throw new ApiError(400, "Invalid investmentAmt");

  next();
};
