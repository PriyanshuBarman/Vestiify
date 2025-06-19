import { ApiError } from "../../../utils/apiError.utils.js";

export const validatePurchase = (req, res, next) => {
  const { symbol, stockName, price, quantity } = req.body;

  const requiredFields = ["symbol", "stockName", "quantity", "price"];

  for (const field of requiredFields) {
    if (!req.body[field] || req.body[field] == "") {
      throw new ApiError(400, `${field} is required`);
    }
  }

  if (isNaN(price) || price <= 0) throw new ApiError(400, "Invalid purchasePrice");

  if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
    throw new ApiError(400, "Invalid quantity");
  }

  next();
};
