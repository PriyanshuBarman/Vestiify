import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const createInvestOrder = async ({ amount, fund, pin }) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/orders/invest`,
    {
      pin,
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
