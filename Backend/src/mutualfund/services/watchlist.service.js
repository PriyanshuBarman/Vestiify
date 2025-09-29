import { db } from "../../../config/db.config.js";

export const fetchWatchlist = async (userId) => {
  return await db.mfWatchlist.findMany({
    where: { userId },
  });
};

export const addToWatchlist = async ({
  userId,
  schemeCode,
  fundName,
  shortName,
}) => {
  return await db.mfWatchlist.create({
    data: {
      userId,
      schemeCode,
      fundName,
      shortName,
    },
  });
};

export const removeFromWatchlist = async (watchlistId) => {
  return await db.mfWatchlist.delete({
    where: { id: watchlistId },
  });
};
