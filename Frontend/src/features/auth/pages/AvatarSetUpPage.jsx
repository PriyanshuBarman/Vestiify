import { useGetUserData } from "@/hooks/queries/internalQueries";
import { Navigate } from "react-router";

function AvatarSetUpPage() {
  const { data } = useGetUserData();
  console.log(data);

  if (!data) return <Navigate to="/login" />;

  return <div>AvatarSetUpPage</div>;
}
export default AvatarSetUpPage;
