import axios from "axios";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const searchProfile = async (query) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/users/search?query=${query}`,
    { withCredentials: true },
  );

  return data.users;
};

export const fetchAllTnx = async (query) => {
  const { data } = await axios.get(
    `${VITE_BACKEND_BASE_URL}/upi/transactions`,
    {
      withCredentials: true,
    },
  );

  return data.transactions;
};

// Mutations

export const sendMoney = async (amount, note, receiverUsername, pin) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/upi/send`,
    {
      amount,
      note,
      receiverUsername,
      pin,
    },
    { withCredentials: true },
  );

  return data.balance;
};
