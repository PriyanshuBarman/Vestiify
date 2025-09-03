import { useGetUserData } from "@/hooks/queries/internalQueries";
import { Navigate } from "react-router";
import { toast } from "sonner";
import LoadingState from "./LoadingState";

function ProtectedRoutes({ children }) {
  const { data, isLoading } = useGetUserData();

  // return children;

  if (isLoading) {
    return <LoadingState />;
  }

  if (!data) {
    toast.error("Please Login");
    return <Navigate to="/auth/login" />;
  } else {
    return children;
  }
}

export default ProtectedRoutes;
