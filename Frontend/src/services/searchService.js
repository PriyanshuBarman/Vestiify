import axios from "axios";

export const fetchSearchResults = async (query) => {
  const { data } = await axios.get(`https://api.kuvera.in/insight/api/v1/global_search.json?query=${query}`);
  return data.data.funds;
};
