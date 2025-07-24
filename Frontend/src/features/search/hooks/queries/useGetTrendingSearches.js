import { useQuery } from "@tanstack/react-query";
import { fetchTrendingSearches } from "../../services/searchService";

export function useGetTrendingSearches() {
  return useQuery({
    queryKey: ["popularFunds"],
    queryFn: fetchTrendingSearches,
  });
}
