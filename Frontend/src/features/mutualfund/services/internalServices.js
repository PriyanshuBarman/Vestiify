import axios from "axios";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const processInvestment = async (amount, fund) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/invest`,
    {
      investmentAmt: Number(amount),
      schemeCode: fund.scheme_code,
      fundName: fund.name,
      fundType: fund.category,
      logoCode: fund.short_code,
      shortName: fund.short_name,
      latestNav: fund.nav.nav,
      latestNavDate: fund.nav.date,
    },
    { withCredentials: true },
  );

  return data;
};

export const fetchPortfolio = async () => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/portfolio`,
    {
      withCredentials: true,
    },
  );

  return data.portfolio;
};

export const fetchPortfolioSummary = async () => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/portfolio/summary`,
    {
      withCredentials: true,
    },
  );
  return data.portfolioSummary;
};
