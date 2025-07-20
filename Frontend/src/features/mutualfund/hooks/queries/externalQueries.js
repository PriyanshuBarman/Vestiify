import { useQuery } from "@tanstack/react-query";
import {
  fetchCategoryFundList,
  fetchChartData,
  fetchFund,
  fetchIndexFunds,
  fetchPopularFunds,
} from "../../services/externalServices";

export const useGetFundData = (schemeCode) => {
  return useQuery({
    queryKey: ["fund", schemeCode],
    queryFn: () => fetchFund(schemeCode),
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

export const useGetChart = (schemeCode) => {
  return useQuery({
    queryKey: ["chartData", schemeCode],
    queryFn: () => fetchChartData(schemeCode),
  });
};

export const useGetCategoryFundList = (name, url) => {
  return useQuery({
    queryKey: ["colletions", name],
    queryFn: () => fetchCategoryFundList(url),
  });
};
