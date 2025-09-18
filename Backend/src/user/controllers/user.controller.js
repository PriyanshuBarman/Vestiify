import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as userService from "../services/user.service.js";

export const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await userService.fetchUser(userId);

  return res.status(200).json({ success: true, user });
});

export const dailyReward = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const updatedBalance = await userService.dailyReward(userId);

  return res.status(200).json({
    success: true,
    message: "₹1000 reward has been added",
    updatedBalance,
  });
});

export const search = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;
  const { query } = req.query;

  const users = await userService.search(query, limit);

  return res.status(200).json({ success: true, users });
});
