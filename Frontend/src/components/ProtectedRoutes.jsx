import { useGetUserData } from "@/hooks/queries/internalQueries";
import { Navigate } from "react-router";
import { toast } from "sonner";
import LoadingState from "./LoadingState";

function ProtectedRoutes({ children }) {
  const { data, isPending } = useGetUserData();

  if (isPending) {
    return <LoadingState fullPage />;
  }

  if (!data) {
    toast.error("Please Login");
    return <Navigate to="/auth/login" />;
  } else if (!data.pin) {
    return <Navigate to="/auth/pin-setup" />;
  } else {
    return children;
  }
}

export default ProtectedRoutes;
