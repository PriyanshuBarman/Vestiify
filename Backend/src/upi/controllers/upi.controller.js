import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as upiService from "../services/upi.service.js";

export const sendMoney = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const { amount, note, receiverUsername } = req.body;

  if (!amount) {
    throw new ApiError(400, "amount is required");
  }
  if (amount <= 0) {
    throw new ApiError(400, "amount shouldn't be in negative");
  }
  if (!receiverUsername) {
    throw new ApiError(400, "receiverUsername is required");
  }

  const balance = await upiService.sendMoney(
    userId,
    amount,
    note,
    receiverUsername
  );

  return res.status(201).json({
    success: true,
    message: "Money send successfully",
    balance,
  });
});

export const getAllTnx = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const transactions = await upiService.fetchAllTnx(userId);

  return res.status(200).json({ success: true, transactions });
});

export const checkBalance = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const balance = await upiService.fetchBalance(userId);

  return res.status(200).json({ success: true, balance });
});
