import { selectTheme } from "@/store/slices/themeSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return children;
}

export default ThemeProvider;
