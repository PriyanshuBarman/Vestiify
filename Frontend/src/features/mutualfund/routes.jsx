import MutualFundLayout from "./MutualFundLayout";
import { lazy } from "react";

const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const FundPage = lazy(() => import("./pages/FundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const OneTimeInvestPage = lazy(() => import("./pages/OneTimeInvestPage"));

export const mutualFundRoutes = {
  path: "/mutual-funds",
  element: <MutualFundLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: ":scheme_code", element: <FundPage /> },
    { path: "collections/:name", element: <CollectionPage /> },
    { path: "one-time/:scheme_code", element: <OneTimeInvestPage /> },
  ],
};
