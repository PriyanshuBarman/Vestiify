import { fetchSearchResults } from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";

export function useSearchResults(query, type) {
  return useQuery({
    queryKey: ["search", query, type],
    queryFn: () => fetchSearchResults(query, type),
    enabled: query?.length > 2,
  });
}
