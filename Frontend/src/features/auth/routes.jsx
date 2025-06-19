import AuthLayout from "./AuthLayout";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <LoginPage /> },
    { path: "signup", element: <SignupPage /> },
    { path: "logout", element: <LogoutPage /> },
  ],
};
