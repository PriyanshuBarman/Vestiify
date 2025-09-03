import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";
import { logoutUser } from "../services/services";

function LogoutPage() {
  const queryClient = useQueryClient();
  const [isLogoutSuccessful, setIsLogoutSuccessful] = useState(false);

  const logout = async () => {
    const data = await logoutUser();
    if (data?.success) {
      queryClient.clear();
      localStorage.clear();
      toast.success(data.message);
      setIsLogoutSuccessful(true);
    } else {
      toast.error(data?.message || "Something went wrong while logging out");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  // Navigate after successful logout
  if (isLogoutSuccessful) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="fixed inset-0 grid place-items-center">Logging out...</div>
  );
}

export default LogoutPage;
