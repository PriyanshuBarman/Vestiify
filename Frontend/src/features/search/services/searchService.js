import axios from "axios";
import {
  VITE_STOCK_SEARCH_API_BASE_URL,
  VITE_MF_API_BASE_URL,
} from "@/config/env";

export const fetchSearchResults = async (query, type) => {
  if (type === "mutualFunds") {
    const { data } = await axios.get(
      `${VITE_MF_API_BASE_URL}/search?query=${query}`,
    );
    return data.funds;
  } else if (type === "indianStocks") {
    const { data } = await axios.get(
      `${VITE_STOCK_SEARCH_API_BASE_URL}query=${query}`,
    );
    return data.data.funds.indian_stocks;
  }
  return null;
};

/**
 * This function is used to fetch the trending searches
 * But for now it is used to fetch the popular funds
 * TODO: Change the function to fetch the trending searches
 */
export const fetchTrendingSearches = async () => {
  const { data } = await axios.get(
    `${VITE_MF_API_BASE_URL}?plan=GROWTH&limit=4&sort_by=return_3y&category=Equity&fund_rating_gte=4`,
  );
  return data.funds;
};
