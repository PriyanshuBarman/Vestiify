import axios from "axios";

const searchApi = import.meta.env.VITE_SEARCH_API_URL;

export const fetchSearchResults = async (query) => {
  const { data } = await axios.get(`${searchApi}query=${query}`);
  return data.data.funds;
};
