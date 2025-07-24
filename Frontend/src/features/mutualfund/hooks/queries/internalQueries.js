import { useQuery } from "@tanstack/react-query";
import {
  fetchPortfolio,
  fetchPortfolioSummary,
} from "../../services/internalServices";

export const useGetPortfolio = () => {
  return useQuery({ queryKey: ["mfPortfolio"], queryFn: fetchPortfolio });
};

export const useGetPortfolioSummary = () => {
  return useQuery({
    queryKey: ["mfPortfolioSummary"],
    queryFn: fetchPortfolioSummary,
  });
};
