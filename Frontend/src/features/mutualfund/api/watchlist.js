import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const addToWatchlist = async ({
  schemeCode,
  fundName,
  shortName,
  fundHouseDomain,
}) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/watchlist`,
    {
      schemeCode,
      fundName,
      shortName,
      fundHouseDomain,
    },
    { withCredentials: true },
  );

  return data;
};

export const removeFromWatchlist = async ({ schemeCode }) => {
  const { data } = await axios.delete(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/watchlist/${schemeCode}`,
    { withCredentials: true },
  );

  return data;
};

export const fetchWatchlist = async () => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/watchlist`,
    { withCredentials: true },
  );

  return data.watchlist;
};

export const isInWatchlist = async (schemeCode) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/watchlist/${schemeCode}`,
    { withCredentials: true },
  );

  return data.isWatchlisted;
};
