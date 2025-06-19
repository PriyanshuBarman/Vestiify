import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (previousState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const { data } = await axios.post(`${baseUrl}/auth/login`, { email, password }, { withCredentials: true });

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
    const { data } = await axios.post(`${baseUrl}/auth/signup`, { name, email, password }, { withCredentials: true });

    if (data.success) return data;
  } catch (error) {
    console.error(error);
    const message = error?.response?.data?.message || "Something went wrong.";

    return { success: false, message, name, email, password };
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/auth/logout`, {
      withCredentials: true,
    });
    if (data.success) return data;
  } catch (error) {
    console.error(error);
    const message = error?.response?.data?.message || "Something went wrong.";
  }
};
