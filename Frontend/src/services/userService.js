import { VITE_BACKEND_BASE_URL } from "@/config/env";
import axios from "axios";

export const fetchUserData = async () => {
  const { data } = await axios.get(`${VITE_BACKEND_BASE_URL}/user`, {
    withCredentials: true,
  });
  return data.user;
};
