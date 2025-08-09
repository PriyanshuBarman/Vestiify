import { createBrowserRouter } from "react-router";
import ComingSoonPage from "./ComingSoonPage";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutualfund/routes";
import Home from "./HomePage";
import Layout from "./layouts/Layout";
import MobileSearchPage from "./features/search/MobileSearchPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

export const routes = createBrowserRouter([
  authRoutes,
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/search",
    element: (
      <ProtectedRoutes>
        <MobileSearchPage />
      </ProtectedRoutes>
    ),
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
