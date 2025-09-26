import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPin } from "../services/services";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSetPin = () => {
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
};
