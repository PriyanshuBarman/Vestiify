import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutualfund/routes";

const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const Home = lazy(() => import("./pages/HomePage"));
const Layout = lazy(() => import("./layouts/Layout"));
const MobileSearchPage = lazy(
  () => import("./features/search/MobileSearchPage"),
);
const AllOrdersPage = lazy(
  () => import("./features/mutualfund/pages/AllOrdersPage"),
);
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Upi = lazy(() => import("./components/Upi"));

export const routes = createBrowserRouter([
  authRoutes,
  {
    index: true,
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoutes>
        <MobileSearchPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoutes>
        <AllOrdersPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <ProfilePage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/upi",
    element: <Upi />,
  },
  { path: "/coming-soon", element: <ComingSoonPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [mutualFundRoutes],
  },
]);
