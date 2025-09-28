import { useQuery } from "@tanstack/react-query";
import { fetchFundsByFilter } from "../api/external";

export function useGetFundsByFilter(filters, limit) {
  return useQuery({
    queryKey: ["fundByFilter", filters, limit],
    queryFn: () => fetchFundsByFilter(filters, limit),
  });
}
