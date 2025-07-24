import { fetchSearchResults } from "@/features/search/services/searchService";
import { useQuery } from "@tanstack/react-query";

export function useGetSearchResults(query, type) {
  return useQuery({
    queryKey: ["search", query, type],
    queryFn: () => fetchSearchResults(query, type),
    enabled: query?.length > 2,
  });
}
