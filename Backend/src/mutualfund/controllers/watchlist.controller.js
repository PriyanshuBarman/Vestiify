import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as watchlistService from "../services/watchlist.service.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const getWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const wishlist = await watchlistService.fetchWatchlist(userId);

  res.status(200).json({ success: true, wishlist });
});

export const addToWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { schemeCode, fundName, shortName } = req.body;

  if (!schemeCode) {
    throw new ApiError(400, "schemeCode is required");
  }
  if (!fundName) {
    throw new ApiError(400, "fundName is required");
  }
  if (!shortName) {
    throw new ApiError(400, "shortName is required");
  }

  await watchlistService.addToWatchlist({
    userId,
    schemeCode,
    fundName,
    shortName,
  });

  res.status(201).json({ success: true, message: "added to watchlist" });
});
export const removeFromWatchlist = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { watchlistId } = req.params;

  if (!watchlistId) {
    throw new ApiError(400, "watchlistId is required");
  }

  await watchlistService.removeFromWatchlist(watchlistId);

  res.status(200).json({ success: true, message: "removed from watchlist" });
});
