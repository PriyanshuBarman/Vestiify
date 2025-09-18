import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutualfund/routes";
import Layout from "./layouts/Layout";
import { upiRoutes } from "./features/upi/routes";

const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const Home = lazy(() => import("./pages/HomePage"));
const MobileSearchPage = lazy(
  () => import("./features/search/MobileSearchPage"),
);
const AllOrdersPage = lazy(
  () => import("./features/mutualfund/pages/AllOrdersPage"),
);
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Upi = lazy(() => import("./components/Upi"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/mutual-funds#explore" replace />,
      },
      upiRoutes,
      mutualFundRoutes,
    ],
  },
  authRoutes,
  {
    path: "/payment-success",
    element: <PaymentSuccessPage />,
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
    path: "/pin",
    element: <Upi />,
  },
  { path: "/coming-soon", element: <ComingSoonPage /> },
]);
