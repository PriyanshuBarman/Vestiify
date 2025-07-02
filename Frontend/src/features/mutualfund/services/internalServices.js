import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const processInvestment = async (amount, fund) => {
  const { data } = await axios.post(
    `${baseURL}/mutual-funds/invest`,
    {
      investmentAmt: Number(amount),
      fundCode: fund.code,
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
  const { data } = await axios.get(`${baseURL}/mutual-funds/portfolio`, {
    withCredentials: true,
  });

  return data.portfolio;
};

export const fetchPortfolioSummary = async () => {
  const { data } = await axios.get(`${baseURL}/mutual-funds/portfolio/summary`, {
    withCredentials: true,
  });
  return data.portfolioSummary;
};
