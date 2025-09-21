import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import AuthGuard from "./components/AuthGuard";
import LoadingState from "./components/LoadingState";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutualfund/routes";
import { walletRoutes } from "./features/wallet/routes";
import Layout from "./layouts/Layout";

const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const MobileSearchPage = lazy(
  () => import("./features/search/MobileSearchPage"),
);
const AllOrdersPage = lazy(
  () => import("./features/mutualfund/pages/AllOrdersPage"),
);
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      walletRoutes,
      mutualFundRoutes,
      {
        index: true,
        element: <Navigate to="/mutual-funds#explore" replace />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <MobileSearchPage />
          </Suspense>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <PaymentSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <AllOrdersPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/coming-soon",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <ComingSoonPage />
          </Suspense>
        ),
      },
    ],
  },
  authRoutes,
]);
