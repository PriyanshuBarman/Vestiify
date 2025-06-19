import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import * as sellService from "../services/sell.service.js";

export const sellSomeQty = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { symbol, price, quantity } = req.body;

  await sellService.sellSomeQty(userId, symbol, price, quantity);

  return res
    .status(200)
    .json({ success: true, message: `${quantity} quantity sold successful` });
});


export const sellAllQty = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { symbol, price } = req.body;

  await sellService.sellAllQty(userId, symbol, price);

  return res
    .status(200)
    .json({ success: true, message: "All quantity sold successfully" });
});
