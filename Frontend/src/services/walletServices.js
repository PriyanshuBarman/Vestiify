import axios from "axios";

export const fetchBalance = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wallet/balance`, {
    withCredentials: true,
  });

  return data.balance;
};
