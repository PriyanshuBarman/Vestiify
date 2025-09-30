import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addToWatchlist } from "../api/watchlist";
import { useQueryClient } from "@tanstack/react-query";

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWatchlist,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["isInWatchlist", variables.schemeCode],
      });
      const previousData = queryClient.getQueryData([
        "isInWatchlist",
        variables.schemeCode,
      ]);

      queryClient.setQueryData(["isInWatchlist", variables.schemeCode], true);
      return { previousData, variables };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["isInWatchlist", context.variables.schemeCode],
        context.previousData,
      );
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["isInWatchlist", variables.schemeCode],
      });
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}
