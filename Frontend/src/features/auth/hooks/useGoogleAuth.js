import { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { VITE_BACKEND_BASE_URL } from "@/config/env";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const fnc = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${VITE_BACKEND_BASE_URL}/auth/google`,
          { code },
          { withCredentials: true },
        );
        if (data.success) {
          navigate("/mutual-funds");
          toast.success(data.message);
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Login error:", errorResponse);
      toast.error("Something went wrong.");
    },
    flow: "auth-code",
  });

  return { googleLogin: fnc, isLoading };
};
