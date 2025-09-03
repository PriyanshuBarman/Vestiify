import PrivateRoutes from "@/components/PrivateRoutes";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { lazy } from "react";
const AuthLayout = lazy(() => import("./AuthLayout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const PinSetupPage = lazy(() => import("./pages/PinSetUpPage"));
const AvatarSetUpPage = lazy(() => import("./pages/AvatarSetUpPage"));

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: (
        <PrivateRoutes>
          <LoginPage />
        </PrivateRoutes>
      ),
    },
    {
      path: "signup",
      element: (
        <PrivateRoutes>
          <SignupPage />
        </PrivateRoutes>
      ),
    },
    {
      path: "logout",
      element: (
        <ProtectedRoutes>
          <LogoutPage />
        </ProtectedRoutes>
      ),
    },
    {
      path: "pin-setup",
      element: <PinSetupPage />,
    },
    {
      path: "avatar-setup",
      element: (
        <ProtectedRoutes>
          <AvatarSetUpPage />
        </ProtectedRoutes>
      ),
    },
  ],
};
