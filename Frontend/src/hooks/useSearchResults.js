import { fetchSearchResults } from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";

export function useSearchResults(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchResults(query),
    enabled: query?.length > 1,
  });
}
