import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import * as wishlistService from "../services/watchlist.service.js";

export const getWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const wishlist = await wishlistService.fetchWatchlist(userId);

  res.status(200).json({ success: true, wishlist });
});

export const addToWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { fundCode } = req.body;

  if (!fundCode) {
    return res.status(400).json({ success: false, message: "fundCode is required" });
  }

  const wishlist = await wishlistService.addToWishlist(userId, fundCode);

  res.status(201).json({ success: true, wishlist });
});
