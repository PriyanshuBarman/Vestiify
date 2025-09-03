import { useQuery } from "@tanstack/react-query";
import {
  fetchFundPortfolio,
  fetchOrderDetail,
  fetchOrders,
  fetchPortfolio,
  fetchPortfolioSummary,
  fetchSipDetail,
  fetchSips,
} from "../../services/internalServices";

export const useGetPortfolio = () => {
  return useQuery({ queryKey: ["mfPortfolio"], queryFn: fetchPortfolio });
};

export const useGetFundPortfolio = (schemeCode) => {
  return useQuery({
    queryKey: ["fundPortfolio", schemeCode],
    queryFn: () => fetchFundPortfolio(schemeCode),
  });
};

export const useGetPortfolioSummary = () => {
  return useQuery({
    queryKey: ["mfPortfolioSummary"],
    queryFn: fetchPortfolioSummary,
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};

export const useGetOrderDetail = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderDetail(orderId),
  });
};

export const useGetSipDetail = (sipId) => {
  return useQuery({
    queryKey: ["sip", sipId],
    queryFn: () => fetchSipDetail(sipId),
  });
};

export const useGetSips = () => {
  return useQuery({
    queryKey: ["sips"],
    queryFn: fetchSips,
  });
};

