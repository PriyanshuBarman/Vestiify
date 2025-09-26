import axios from "axios";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const loginUser = async ({ email, password }) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/auth/login`,
    { email, password },
    { withCredentials: true },
  );

  return data?.user;
};

export const signupUser = async ({ fullName, email, password }) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/auth/signup`,
    { fullName, email, password },
    { withCredentials: true },
  );

  return data?.user;
};

export const logoutUser = async () => {
  try {
    const { data } = await axios.get(`${VITE_BACKEND_BASE_URL}/auth/logout`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    const message = error?.response?.data?.message || "Something went wrong.";
    return { success: false, message };
  }
};

export const createPin = async (pin) => {
  const { data } = await axios.post(
    `${VITE_BACKEND_BASE_URL}/auth/pin`,
    { pin },
    { withCredentials: true },
  );
};
