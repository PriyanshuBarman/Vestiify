import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutUser } from "../services/services";

function LogoutPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isLogoutSuccessfull = false;
  const logout = async () => {
    const data = await logoutUser();
    if (data?.success) {
      queryClient.clear();
      localStorage.clear();
      toast.success(data.message);
      isLogoutSuccessfull = true;
    } else {
      toast.error(data?.message || "Something went wrong while logging out");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  if (isLogoutSuccessfull) return <Navigate to="/auth/login" />;

  return (
    <div className="fixed inset-0 grid place-items-center">Logging out... </div>
  );
}

export default LogoutPage;
