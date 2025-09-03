import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { processInvestment, startSip } from "../../services/internalServices";
import { toast } from "sonner";

export const useMakeInvestment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, fund }) => processInvestment(amount, fund),

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/mutual-funds/#investments");

      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useStartSip = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, sipDate, fund }) => startSip(amount, sipDate, fund),

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/mutual-funds/#investments");

      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error) => {
      toast.error(
        error.status === 500
          ? "Something went wrong"
          : error.response?.data?.message,
      );
    },
  });
};
