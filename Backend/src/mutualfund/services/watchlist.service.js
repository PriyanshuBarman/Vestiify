import { watchlistRepo } from "../repositories/watchlist.repository.js";

export const fetchWatchlist = async (userId) => {
  return await watchlistRepo.findMany({ userId });
};

export const addToWatchlist = async ({
  userId,
  schemeCode,
  fundName,
  shortName,
}) => {
  return await watchlistRepo.create({
    userId,
    schemeCode,
    fundName,
    shortName,
  });
};

export const removeFromWatchlist = async (watchlistId) => {
  return await watchlistRepo.delete({ id: watchlistId });
};
