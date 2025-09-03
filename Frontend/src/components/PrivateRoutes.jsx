import { useGetUserData } from "@/hooks/queries/internalQueries";
import { Navigate } from "react-router";
import LoadingState from "./LoadingState";

function PrivateRoutes({ children, isFullLoggedin = true }) {
  const { data, isPending } = useGetUserData();

  if (isPending) {
    return <LoadingState fullPage={true} />;
  } else if (data) {
    return <Navigate to="/mutual-funds/#explore" />;
  } else {
    return children;
  }
}

export default PrivateRoutes;
