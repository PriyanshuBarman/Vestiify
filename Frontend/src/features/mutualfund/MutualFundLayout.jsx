import { Outlet } from "react-router";
import Tabs from "./components/Tabs";

function MutualFundLayout() {
  return (
    <div className="sm:pb-24 sm:mt-6 sm:px-12 xl:px-0">
      <Tabs />
      <Outlet />
    </div>
  );
}

export default MutualFundLayout;
