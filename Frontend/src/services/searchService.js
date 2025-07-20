import axios from "axios";
import { VITE_SEARCH_API_BASE_URL } from "@/config/env";

export const fetchSearchResults = async (query) => {
  const { data } = await axios.get(`${VITE_SEARCH_API_BASE_URL}query=${query}`);
  return data.data.funds;
};
