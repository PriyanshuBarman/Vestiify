import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  cancelSip,
  editSip,
  processInvestment,
  skipSip,
  startSip,
} from "../../services/internalServices";
import { toast } from "sonner";
import { formatToINR } from "../../utils/formaters";

export const useMakeInvestment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, fund, pin }) => processInvestment(amount, fund, pin),

    onSuccess: (data, variables) => {
      const { amount, fund } = variables;
      navigate("/payment-success", {
        state: {
          amount,
          title: "Order Placed",
          description: `Investment of ${formatToINR(amount)} in ${fund.short_name}.`,
          orderDetailsRoute: "/mutual-funds#investments",
          doneRoute: "/mutual-funds#investments",
        },
        replace: true,
      });

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
    mutationFn: ({ amount, sipDate, fund, pin }) =>
      startSip(amount, sipDate, fund, pin),

    onSuccess: (data, variables) => {
      const { amount, fund } = variables;
      toast.success(data.message);
      navigate("/payment-success", {
        state: {
          amount,
          title: "SIP Order Placed",
          description: `SIP of ${formatToINR(amount)} in ${fund.short_name}.`,
          orderDetailsRoute: "/mutual-funds/#sips",
          doneRoute: "/mutual-funds#sips",
        },
        replace: true,
      });

      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useEditSip = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sipId, amount, sipDate }) => editSip(sipId, amount, sipDate),

    onSuccess: (data, variables) => {
      console.log(data);
      toast.success(data.message);
      navigate("/mutual-funds/#sips");
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["sip", variables.sipId] });
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

export const useCancelSip = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sipId }) => cancelSip(sipId),

    onSuccess: (data, variables) => {
      toast.success(data.message);
      navigate("/mutual-funds/#sips");
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["sip", variables.sipId] });
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

export const useSkipSip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sipId }) => skipSip(sipId),

    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["sip", variables.sipId] });
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
