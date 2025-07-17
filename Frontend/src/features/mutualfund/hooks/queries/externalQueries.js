import { useQuery } from "@tanstack/react-query";
import {
  fetchCategoryFundList,
  fetchChartData,
  fetchFund,
  fetchIndexFunds,
  fetchPopularFunds,
} from "../../services/externalServices";

export const useGetFundData = (kuvera_id) => {
  return useQuery({
    queryKey: ["fund", kuvera_id],
    queryFn: () => fetchFund(kuvera_id),
  });
};

export const useGetPopularFunds = () => {
  return useQuery({ queryKey: ["popularFunds"], queryFn: fetchPopularFunds });
};

export const useIndexFunds = () => {
  return useQuery({
    queryKey: ["index-funds"],
    queryFn: () => fetchIndexFunds(),
  });
};

export const useGetChart = (code) => {
  return useQuery({
    queryKey: ["chartData", code],
    queryFn: () => fetchChartData(code),
  });
};

export const useGetCategoryFundList = (name, url) => {
  return useQuery({
    queryKey: ["colletions", name],
    queryFn: () => fetchCategoryFundList(url),
  });
};
