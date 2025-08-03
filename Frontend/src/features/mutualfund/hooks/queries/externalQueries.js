import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchCategoryFundList,
  fetchChartData,
  fetchFund,
  fetchIndexFunds,
  fetchPopularFunds,
  fetchFilteredFunds,
  fetchAMCs,
  fetchCategories,
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
    queryKey: ["indexFunds"],
    queryFn: fetchIndexFunds,
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

export const useGetAMCs = () => {
  return useQuery({ queryKey: ["amcs"], queryFn: fetchAMCs });
};

export const useGetCategories = () => {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
};

export const useFilteredFunds = (filters) => {
  const LIMIT = 20;
  return useInfiniteQuery({
    queryKey: ["filteredFunds", filters],
    queryFn: ({ pageParam = 0 }) => {
      return fetchFilteredFunds({ pageParam, filters, LIMIT });
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * LIMIT;
      return lastPage.funds.length === LIMIT ? nextOffset : undefined;
    },
  });
};
