import { useGetUserData } from "@/hooks/queries/internalQueries";
import { Navigate } from "react-router";
import { toast } from "sonner";
import LoadingState from "./LoadingState";

function ProtectedRoutes({ children }) {
  const { isPending, isSuccess, error } = useGetUserData();

  return children;
  if (isPending)
    return (
      <LoadingState
        isLoading={true}
        className="absolute inset-0 flex items-center justify-center"
      />
    );

  if (isSuccess) {
    return children;
  } else {
    console.log(error);
    toast.error(error?.response?.data.message || "An error occurred");
    return <Navigate to="/auth/login" />;
  }
}

export default ProtectedRoutes;
