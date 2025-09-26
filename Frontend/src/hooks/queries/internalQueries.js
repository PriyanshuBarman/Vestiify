import { fetchProfileById, fetchUserData } from "@/services/userService";
import { fetchBalance } from "@/services/walletServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetUserData = () => {
  const queryClient = useQueryClient();
  const initialData = localStorage.getItem("USER_DATA");

  const query = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    initialData: () => (initialData ? JSON.parse(initialData) : undefined),
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (query?.error?.response?.status === 404) {
      queryClient.clear();
      localStorage.clear();
      return;
    }

    if (!query.data) {
      localStorage.removeItem("USER_DATA");
    } else {
      localStorage.setItem("USER_DATA", JSON.stringify(query.data));
    }
  }, [query.data, query.isError]);

  return query;
};

export const useGetBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
    staleTime: 0,
  });
};

export const useGetProfileById = (userId, state) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfileById(userId),
    enabled: !state?.fullName && !state?.username && !state?.avatar,
  });
};
