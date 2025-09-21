import { useQuery } from "@tanstack/react-query";
import { fetchAllTnx, searchProfile } from "../../services/internalService";

export const useSearchProfile = (query) => {
  return useQuery({
    queryKey: ["profiles", query],
    queryFn: () => searchProfile(query),
    enabled: !!query,
  });
};

export const useGetAllTnx = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchAllTnx,
    staleTime: 0,
  });
};
