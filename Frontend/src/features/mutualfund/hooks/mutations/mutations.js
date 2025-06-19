import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { processInvestment } from "../../services/internalServices";
import { toast } from "sonner";

export const useMakeInvestment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, fund }) => processInvestment(amount, fund),

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/mutual-funds/#investments");
      queryClient.invalidateQueries({ queryKey: ["mf-portfolio-summary"] });
      queryClient.invalidateQueries({ queryKey: ["mf-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
