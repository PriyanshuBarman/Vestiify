import { VITE_GOOGLE_CLIENT_ID } from "@/config/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { routes } from "./routes";
import { selectTheme } from "./store/slices/themeSlice";
import { TZDate } from "react-day-picker";
import { getDate, isSameDay } from "date-fns";

function App() {
  const queryClient = useQueryClient();

  const checkAndClearCacheIfNeeded = () => {
    const storedDate = localStorage.getItem("lastFetchDate");
    const currentDate = getDate(TZDate.tz("Asia/Kolkata"));
    if (!storedDate || currentDate > storedDate) {
      queryClient.clear();
      localStorage.setItem("lastFetchDate", currentDate);
    }
  };

  useEffect(() => {
    checkAndClearCacheIfNeeded();
  }, []);

  const theme = useSelector(selectTheme);

  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={routes} />
      <Toaster theme={theme} position="top-right" richColors />
    </GoogleOAuthProvider>
  );
}

export default App;
