import { useQuery } from "@tanstack/react-query";
import { fetchCategoryFundList } from "../api/external";

export function useGetCategoryFundList(name, url) {
  return useQuery({
    queryKey: ["colletions", name],
    queryFn: () => fetchCategoryFundList(url),
  });
}
