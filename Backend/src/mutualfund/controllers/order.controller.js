import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as orderService from "../services/order.service.js";

export const placeInvestmentOrder = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { amount, fundName, schemeCode, fundCategory } = req.body;

  await orderService.placeInvestmentOrder({
    userId,
    amount,
    schemeCode,
    fundName,
    fundCategory,
  });

  return res.status(201).json({
    success: true,
    message: "Investment Order Placed",
  });
});

export const placeRedemptionOrder = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { amount, fundId, isInstant = false } = req.body;

  await orderService.placeRedemptionOrder(userId, fundId, isInstant);

  return res.status(201).json({
    success: true,
    message: "Redeem Order Placed",
  });
});

export const getOrders = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const orders = await orderService.getOrders(userId);

  return res.status(200).json({
    success: true,
    data: orders,
  });
});
