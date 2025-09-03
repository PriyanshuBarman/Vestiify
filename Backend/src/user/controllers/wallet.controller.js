import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as walletService from "../services/wallet.service.js";

export const getBalance = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const balance = await walletService.fetchBalance(userId);

  return res.status(200).json({ success: true, balance });
});

export const deposit = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0)
    throw new ApiError(400, "Invalid amount");

  await walletService.depositBalance(userId, amount);

  return res.status(200).json({ success: true, message: "Deposit successful" });
});
