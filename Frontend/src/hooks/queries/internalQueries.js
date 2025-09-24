import { fetchUserData, fetchProfileById } from "@/services/userService";
import { fetchBalance } from "@/services/walletServices";
import { useQuery } from "@tanstack/react-query";

export const useGetBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
    staleTime: 0,
  });
};

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,

    retry: false,
    staleTime: 0,
    gcTime: Infinity,
  });
};

export const useGetProfileById = (userId, state) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfileById(userId),
    enabled: !state?.fullName && !state?.username && !state?.avatar,
  });
};
