import { watchlistRepo } from "../repositories/watchlist.repository.js";

export const fetchWatchlist = async (userId) => {
  return await watchlistRepo.findMany({ userId });
};
