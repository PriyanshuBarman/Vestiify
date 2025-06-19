import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutUser } from "../services/services";

function LogoutPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    const data = await logoutUser();
    if (data?.success) {
      queryClient.clear();
      toast.success(data.message);
      navigate("/auth/login");
    } else {
      toast.error(data?.message || "Something went wrong while logging out");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return <div>Logout page </div>;
}

export default LogoutPage;
