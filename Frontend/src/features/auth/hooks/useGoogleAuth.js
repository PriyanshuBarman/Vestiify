import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const navigate = useNavigate();

  const fnc = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        { code },
        { withCredentials: true },
      );
      if (data.success) {
        navigate("/mutual-funds");
        toast.success(data.message);
      }
    },
    onError: (errorResponse) => {
      console.error("Login error:", errorResponse);
      toast.error("Something went wrong.");
    },
    flow: "auth-code",
  });

  return fnc;
};
