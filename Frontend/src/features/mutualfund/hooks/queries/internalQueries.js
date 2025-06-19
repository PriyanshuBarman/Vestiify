import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio, fetchPortfolioSummary } from "../../services/internalServices";

export const useGetPortfolio = () => {
  return useQuery({ queryKey: ["mf-portfolio"], queryFn: fetchPortfolio });
};

export const useGetPortfolioSummary = () => {
  return useQuery({ queryKey: ["mf-portfolio-summary"], queryFn: fetchPortfolioSummary });
};


