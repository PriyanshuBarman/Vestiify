import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const fetchUserData = async () => {
  const { data } = await axios.get(`${VITE_BACKEND_BASE_URL}/user`, {
    withCredentials: true,
  });

  return data.user;
};

export const claimDailyReward = async () => {
  const { data } = await axios.patch(
    `${VITE_BACKEND_BASE_URL}/user/claim-daily-reward`,
    {},
    {
      withCredentials: true,
    },
  );

  return data;
};
