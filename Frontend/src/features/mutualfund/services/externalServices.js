import axios from "axios";

const chartApiUrl = import.meta.env.VITE_MF_CHART_API_URL;
const baseURL = import.meta.env.VITE_MF_API_URL;

export const fetchFund = async (kuvera_id) => {
  const { data } = await axios.get(`${baseURL}/funds/code/${kuvera_id}`);
  return data.fund;
};

export const fetchIndexFunds = async () => {
  const { data } = await axios.get(`${baseURL}/funds?plan=GROWTH&fund_category=index funds&limit=4`);
  return data.funds;
};

export const fetchPopularFunds = async () => {
  const { data } = await axios.get(
    `${baseURL}/funds?plan=GROWTH&limit=4&sort_by=return_3y&category=Equity&fund_rating_gte=4`,
  );
  return data.funds;
};

export const fetchCategoryFundList = async (url) => {
  const { data } = await axios.get(url);
  return data.funds;
};

export const fetchChartData = async (fundCode) => {
  const { data } = await axios.get(`${chartApiUrl}/mf/api/v6/fund_navs/${fundCode}.json`);

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
