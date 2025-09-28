import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMoney } from "../api/wallet";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { formatToINR } from "@/utils/formatters";

export const useSendMoney = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMoney,
    onSuccess: (balance, variables) => {
      const { amount, fullName } = variables;
      queryClient.setQueryData(["balance"], balance);
      navigate("/payment-success", {
        state: {
          amount,
          title: "Payment Successful",
          description: `${formatToINR(amount)} has been successfully sent to ${fullName}.`,
          orderDetailsRoute: "/wallet/transactions",
          doneRoute: "/wallet",
        },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
