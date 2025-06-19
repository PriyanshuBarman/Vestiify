import axios from "axios";

const baseURL = import.meta.env.VITE_EXTERNAL_MF_API_URL;

export const fetchFund = async (kuvera_id) => {
  const { data } = await axios.get(`${baseURL}/mf/api/v5/fund_schemes/${kuvera_id}.json`);
  return data[0];
};

export const fetchPopularFunds = async () => {
  const { data } = await axios.get(
    `${baseURL}/insight/api/v1/mutual_fund_search.json?limit=4&sort_by=three_year_return&order_by=desc&scheme_plan=GROWTH&category=Equity&rating=4,5`,
  );
  return data.data.funds;
};

export const fetchIndexFunds = async () => {
  const { data } = await axios.get(
    `${baseURL}/insight/api/v1/mutual_fund_search.json?limit=4&sort_by=rating&order_by=desc&scheme_plan=GROWTH&category=Others&sub_category=Index%20Funds`,
  );
  return data.data.funds;
};

export const fetchExitLoad = async (fundCode) => {
  const { data } = await axios.get(`${baseURL}/mf/api/v5/fund_exit_loads/${fundCode}.json`);
  return data[0].exit_load[0];
};

export const fetchChartData = async (fundCode) => {
  const { data } = await axios.get(`${baseURL}/mf/api/v6/fund_navs/${fundCode}.json`);

  const fullChartData = data.map((item) => {
    const timestamp = item[0];
    const dateObj = new Date(timestamp * 1000);
    const date = dateObj.toLocaleDateString("en-GB", {
      dateStyle: "medium",
      timeZone: "UTC",
    });
    return { timestamp, date: date, nav: item[1] };
  });

  return fullChartData;
};

export const fetchCategoryFundList = async (url) => {
  const { data } = await axios.get(url);
  return data.data.funds;
};
