import axios from "axios";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const fetchPortfolio = async () => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/portfolio`,
    {
      withCredentials: true,
    },
  );

  return data.portfolio;
};

export const fetchFundPortfolio = async (schemeCode) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/portfolio/${schemeCode}`,
    {
      withCredentials: true,
    },
  );

  return data.fund;
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
