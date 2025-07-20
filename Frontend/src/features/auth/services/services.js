import axios from "axios";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const loginUser = async (previousState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const { data } = await axios.post(
      `${VITE_BACKEND_BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true },
    );

    if (data.success) return data;
  } catch (error) {
    console.error(error);
    const message = error?.response?.data?.message || "Something went wrong.";
    return { success: false, message, email, password };
  }
};

export const signupUser = async (previousState, formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await axios.post(
      `${VITE_BACKEND_BASE_URL}/auth/signup`,
      { name, email, password },
      { withCredentials: true },
    );

    if (data.success) return data;
  } catch (error) {
    console.error(error);
    const message = error?.response?.data?.message || "Something went wrong.";

    return { success: false, message, name, email, password };
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axios.get(`${VITE_BACKEND_BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    if (data.success) return data;
  } catch (error) {
    console.error(error);
    const message = error?.response?.data?.message || "Something went wrong.";
  }
};
