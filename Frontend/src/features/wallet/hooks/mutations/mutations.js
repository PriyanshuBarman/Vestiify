import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMoney } from "../../services/internalService";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { formatToINR } from "@/features/mutualfund/utils/formaters";

export const useSendMoney = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, note, receiverId, pin }) =>
      sendMoney(amount, note, receiverId, pin),

    onSuccess: (balance, variables) => {
      const { amount, fullName } = variables;

      navigate("/payment-success", {
        state: {
          amount,
          title: "Payment Successful",
          description: `${formatToINR(amount)} has been successfully sent to ${fullName}.`,
          orderDetailsRoute: "/wallet/transactions",
          doneRoute: "/wallet"
        },
        replace: true,
      });

      queryClient.setQueryData(["balance"], balance);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
