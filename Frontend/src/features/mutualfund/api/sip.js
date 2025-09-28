import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const createSip = async ({ amount, sipDate, fund, pin }) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sips`,
    {
      pin,
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

export const editSip = async ({ sipId, amount, sipDate }) => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sips/${sipId}`,
    {
      amount: Number(amount),
      sipDate,
    },
    { withCredentials: true },
  );

  return data;
};

export const deleteSip = async (sipId) => {
  const { data } = await axios.delete(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sips/${sipId}`,
    { withCredentials: true },
  );

  return data;
};

export const skipSip = async (sipId) => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sips/${sipId}/skip`,
    {},
    { withCredentials: true },
  );

  return data;
};

// ================= QUERIES ==============================

export const fetchSips = async () => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sips`,
    {
      withCredentials: true,
    },
  );

  return data;
};

export const fetchSipDetail = async (sipId) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/mutual-funds/sips/${sipId}`,
    {
      withCredentials: true,
    },
  );

  return data;
};
