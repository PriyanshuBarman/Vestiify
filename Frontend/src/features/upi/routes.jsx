import { lazy } from "react";
import AllTnxPage from "./pages/AllTnxPage";
const SendMoneyPage = lazy(() => import("./pages/SendMoneyPage"));
const EnterAmountPage = lazy(() => import("./pages/EnterAmountPage"));
const PinPage = lazy(() => import("./pages/PinPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

export const upiRoutes = {
  path: "upi",
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "send",
      element: <SendMoneyPage />,
    },
    {
      path: "enter-amount",
      element: <EnterAmountPage />,
    },
    {
      path: "pin",
      element: <PinPage />,
    },
    {
      path: "transactions",
      element: <AllTnxPage />,
    },
  ],
};
