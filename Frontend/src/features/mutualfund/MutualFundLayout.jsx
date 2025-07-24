import { Outlet, useNavigate } from "react-router";
import Tabs from "./components/Tabs";
import { useEffect } from "react";

function MutualFundLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/mutual-funds#explore");
  }, []);

  return (
    <div className="sm:mt-6 sm:px-12 xl:px-0">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default MutualFundLayout;
