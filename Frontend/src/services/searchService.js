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
