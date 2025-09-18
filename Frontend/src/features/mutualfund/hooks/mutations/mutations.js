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

export const useMakeInvestment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, fund, pin }) => processInvestment(amount, fund, pin),

    onSuccess: (data, variables) => {
      const { amount, fund } = variables;
      navigate("/mutual-funds/payment-success", {
        state: {
          amount,
          fundName: fund.name,
          orderType: "Investment",
          orderDetailsRoute: "/mutual-funds/#investments",
        },
        replace: true,
      });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong", {
        className:
          "!bg-white !border-none !text-black dark:!bg-white dark:!text-black",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
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
      navigate("/mutual-funds/payment-success", {
        state: {
          amount,
          fundName: fund.name,
          orderType: "SIP",
          orderDetailsRoute: "/mutual-funds/#sips",
        },
        replace: true,
      });

      queryClient.invalidateQueries({ queryKey: ["sips"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong", {
        className:
          "!bg-white !border-none !text-black dark:!bg-white dark:!text-black",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
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
