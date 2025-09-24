import { lazy, Suspense } from "react";
import LoadingState from "@/components/LoadingState";
import MyQrCodePage from "./components/MyQrCodeDrawer";

const TnxHistoryPage = lazy(() => import("./pages/TnxHistoryPage"));
const SendMoneyPage = lazy(() => import("./pages/SendMoneyPage"));
const EnterAmountPage = lazy(() => import("./pages/EnterAmountPage"));
const WalletPage = lazy(() => import("./pages/WalletPage"));

export const walletRoutes = {
  path: "wallet",
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <WalletPage />
        </Suspense>
      ),
    },
    {
      path: "send",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <SendMoneyPage />
        </Suspense>
      ),
    },
    {
      path: "enter-amount",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <EnterAmountPage />
        </Suspense>
      ),
    },
    {
      path: "my-qr-code",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <MyQrCodePage />
        </Suspense>
      ),
    },

    {
      path: "transactions",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <TnxHistoryPage />
        </Suspense>
      ),
    },
  ],
};
