import { useGetUserData } from "@/hooks/queries/internalQueries";
import { Navigate } from "react-router";
import LoadingState from "./LoadingState";

function AuthGuard({ children, mode = "protected" }) {
  const { data, isPending, isError, error } = useGetUserData();

  if (isPending) {
    return <LoadingState fullPage />;
  }

  // ----- Protected Mode -----
  if (mode === "protected") {
    if (error?.response?.status === 404) {
      localStorage.clear();
      return <Navigate to="/auth/signup" replace />;
    }

    if (!data) return <Navigate to="/auth/signup" replace />;
    if (!data.hasPin) return <Navigate to="/auth/pin-setup" replace />;
    return children;
  }

  // ----- Private Mode -----
  if (mode === "private") {
    if (data?.hasPin && !isError) return <Navigate to="/" replace />;
    return children;
  }

  return children;
}

export default AuthGuard;
