import axios from "axios";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const fetchSips = async () => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sip`,
    {
      withCredentials: true,
    },
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

export const fetchFundPortfolio = async (schemeCode) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/portfolio/${schemeCode}`,
    {
      withCredentials: true,
    },
  );

  return data;
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

export const fetchOrders = async () => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/orders`,
    {
      withCredentials: true,
    },
  );

  return data.orders;
};

export const fetchOrderDetail = async (orderId) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/orders/${orderId}`,
    {
      withCredentials: true,
    },
  );

  return data.order;
};

// mutations

export const processInvestment = async (amount, fund) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/orders/invest`,
    {
      amount: Number(amount),
      schemeCode: fund.scheme_code,
      fundName: fund.name,
      shortName: fund.short_name,
      fundType: fund.fund_type,
      fundCategory: fund.fund_category,
      fundHouseDomain: fund.detail_info,
    },
    { withCredentials: true },
  );

  return data;
};

export const startSip = async (amount, sipDate, fund) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sip`,
    {
      amount: Number(amount),
      sipDate,
      schemeCode: fund.scheme_code,
      fundName: fund.name,
      shortName: fund.short_name,
      fundCategory: fund.fund_category,
      fundType: fund.fund_type,
      fundHouseDomain: fund.detail_info,
    },
    { withCredentials: true },
  );

  return data;
};
