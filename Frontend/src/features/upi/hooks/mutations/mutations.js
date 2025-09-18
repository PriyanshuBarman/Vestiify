import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMoney } from "../../services/internalService";
import { useNavigate } from "react-router";

export const useSendMoney = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, note, receiverUsername, pin }) =>
      sendMoney(amount, note, receiverUsername, pin),

    onSuccess: (balance, variables) => {
      const { amount } = variables;

      navigate("/payment-success", {
        state: {
          amount,
          title: "Payment Successful",
          description: "Your payment has been successfully processed.",
          orderDetailsRoute: "/upi/orders",
        },
        replace: true,
      });

      queryClient.setQueryData(["balance"], balance);
    },
  });
};
