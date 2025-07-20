import axios from "axios";
import { VITE_MF_API_BASE_URL, VITE_MF_CHART_API_BASE_URL } from "@/config/env";

export const fetchFund = async (schemeCode) => {
  const { data } = await axios.get(
    `${VITE_MF_API_BASE_URL}/funds/scheme_code/${schemeCode}`,
  );
  return data.fund;
};

export const fetchIndexFunds = async () => {
  const { data } = await axios.get(
    `${VITE_MF_API_BASE_URL}/funds?plan=GROWTH&fund_category=index funds&limit=4`,
  );
  return data.funds;
};

export const fetchPopularFunds = async () => {
  const { data } = await axios.get(
    `${VITE_MF_API_BASE_URL}/funds?plan=GROWTH&limit=4&sort_by=return_3y&category=Equity&fund_rating_gte=4`,
  );
  return data.funds;
};

export const fetchCategoryFundList = async (url) => {
  const { data } = await axios.get(url);
  return data.funds;
};

export const fetchChartData = async (scheme_code) => {
  const { data } = await axios.get(
    `${VITE_MF_CHART_API_BASE_URL}/${scheme_code}`,
  );

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
