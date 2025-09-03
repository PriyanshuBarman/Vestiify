import { lazy } from "react";
const MutualFundLayout = lazy(() => import("./MutualFundLayout"));
const SipDetailsPage = lazy(() => import("./pages/SipDetailsPage"));
const EditSipPage = lazy(() => import("./pages/EditSipPage"));
const InvestPage = lazy(() => import("./pages/InvestPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const FundPage = lazy(() => import("./pages/FundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AllFundsPage = lazy(() => import("./pages/AllFundsPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const UpiPage = lazy(() => import("./pages/UpiPage"));
const CompareFundsPage = lazy(() => import("./pages/CompareFundsPage"));
const SipCalculatorPage = lazy(() => import("./pages/SipCalculatorPage"));

export const mutualFundRoutes = {
  path: "/mutual-funds",
  element: <MutualFundLayout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: ":scheme_code",
      element: <FundPage />,
    },
    {
      path: "compare-funds",
      element: <CompareFundsPage />,
    },
    {
      path: "collections/:name",
      element: <CollectionPage />,
    },
    {
      path: "all-funds",
      element: <AllFundsPage />,
    },
    {
      path: "order/:orderId",
      element: <OrderDetailsPage />,
    },
    {
      path: "sip/:sipId",
      element: <SipDetailsPage />,
    },
    {
      path: "edit/sip/:sipId",
      element: <EditSipPage />,
    },
    {
      path: "payment-success",
      element: <PaymentSuccessPage />,
    },
    {
      path: "invest/:orderType",
      element: <InvestPage />,
    },
    {
      path: "sip-calculator",
      element: <SipCalculatorPage />,
    },
    {
      path: "upi",
      element: <UpiPage />,
    },
  ],
};
