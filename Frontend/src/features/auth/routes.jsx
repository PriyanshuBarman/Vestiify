import AuthGuard from "@/components/AuthGuard";
import LoadingState from "@/components/LoadingState";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PinSetupPage = lazy(() => import("./pages/PinSetUpPage"));
const AvatarSetUpPage = lazy(() => import("./pages/AvatarSetUpPage"));

export const authRoutes = {
  path: "/auth",
  children: [
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <AuthGuard mode="private">
            <LoginPage />
          </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <AuthGuard mode="private">
            <SignupPage />
          </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "logout",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <AuthGuard>
            <LogoutPage />
          </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "pin-setup",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <AuthGuard mode="private">
            <PinSetupPage />
          </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "avatar-setup",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <AuthGuard>
            <AvatarSetUpPage />
          </AuthGuard>
        </Suspense>
      ),
    },
  ],
};
