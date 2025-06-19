import { fetchBalance } from "@/services/walletServices";
import { useQuery } from "@tanstack/react-query";

export const useGetBalance = () => {
  return useQuery({ queryKey: ["balance"], queryFn: fetchBalance });
};
