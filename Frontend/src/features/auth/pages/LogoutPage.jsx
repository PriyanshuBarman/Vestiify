import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutUser } from "../services/services";

function LogoutPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="fixed inset-0 grid place-items-center">Logging out...</div>
  );
}

export default LogoutPage;
