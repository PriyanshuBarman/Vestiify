import { ApiError } from "../../shared/utils/apiError.utils.js";

export const validateSellSomeQty = (req, res, next) => {
  const { symbol, quantity, price } = req.body;

  const requiredFields = ["symbol", "quantity", "price"];

  for (const field of requiredFields) {
    if (!req.body[field] || req.body[field] == "") {
      throw new ApiError(400, `${field} is required`);
    }
  }

  if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity))
    throw new ApiError(400, "Invalid quantity");

  if (isNaN(price) || price <= 0 || !Number.isInteger(price))
    throw new ApiError(400, "Invalid price");

  next();
};

export const validateSellAllQty = (req, res, next) => {
  const { symbol, price } = req.body;

  if (!symbol) throw new ApiError(400, "symbol required");

  if (!price) throw new ApiError(400, "price required");

  if (isNaN(price) || price <= 0 || !Number.isInteger(price))
    throw new ApiError(400, "Invalid price");

  next();
};
