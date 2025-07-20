import axios from "axios";

const chartApiUrl = import.meta.env.VITE_MF_CHART_API_URL;
const baseURL = import.meta.env.VITE_MF_API_URL;

export const fetchFund = async (schemeCode) => {
  const { data } = await axios.get(
    `${baseURL}/funds/scheme_code/${schemeCode}`,
  );
  return data.fund;
};

export const fetchIndexFunds = async () => {
  const { data } = await axios.get(
    `${baseURL}/funds?plan=GROWTH&fund_category=index funds&limit=4`,
  );
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

export const fetchChartData = async (scheme_code) => {
  const { data } = await axios.get(`${chartApiUrl}/${scheme_code}`);

  const fullChartData = data.data?.map((entry) => {
    const [day, month, year] = entry.date.split("-");
    const d = new Date(`${year}-${month}-${day}`);
    const dd = d.toLocaleDateString("en-GB", {
      dateStyle: "medium",
      timeZone: "UTC",
    });

    return { date: dd, nav: Number(entry.nav) };
  });

  return fullChartData.reverse();
};
