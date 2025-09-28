import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createPin } from "../api/auth";

export function useSetPin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPin,
    onSuccess: () => {
      queryClient.setQueryData(["user"], (prev) => {
        return { ...prev, hasPin: true };
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
