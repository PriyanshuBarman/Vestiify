import { Outlet } from "react-router";
import BottomNavbar from "./BottomNavbar";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTop />
      <BottomNavbar />
    </>
  );
}

export default Layout;
