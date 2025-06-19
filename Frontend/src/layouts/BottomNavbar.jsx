import { ChartNoAxesCombined, HandCoins, PieChartIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";

const tabs = [
  { name: "MF", icon: <PieChartIcon className="max-sm:size-5" />, link: "/mutual-funds#explore" },
  { name: "Stock", icon: <ChartNoAxesCombined className="max-sm:size-5" />, link: "/stocks" },
  { name: "Gold", icon: <HandCoins className="max-sm:size-5" />, link: "/gold" },
];
const allowedRoutes = ["/mutual-funds", "/stocks", "/gold"];

function BottomNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (!allowedRoutes.includes(currentPath)) return;

  const activeTabIndex = tabs.findIndex((tab) => currentPath === tab.link);
  const activeTab = activeTabIndex !== -1 ? activeTabIndex : 0;

  const tabCount = tabs.length;
  const tabWidth = 100 / tabCount;

  return (
    <nav className="fixed right-1/2 bottom-0.5 left-1/2 z-10 flex w-full -translate-x-1/2 justify-center sm:bottom-2">
      <div className="Navbar relative w-[300px] rounded-2xl border bg-zinc-100/90 p-1 backdrop-blur-sm dark:bg-zinc-950/90 dark:shadow-white/15">
        <div className="relative flex h-14 items-center justify-around sm:min-h-16">
          <div
            className="Active-Layout absolute top-0 bottom-0 left-0 rounded-2xl bg-white transition-all duration-200 dark:bg-white/12.5"
            style={{
              width: `${tabWidth}%`,
              transform: `translateX(${activeTab * 100}%)`,
            }}
          ></div>

          {tabs.map((item, idx) => (
            <NavLink
              to={`${item.link === "/mutual-funds" ? item.link : "/coming-soon"}`}
              key={idx}
              className={({ isActive }) =>
                `relative z-10 flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-4 pt-2.5 pb-1.5 text-[0.65rem] transition-all duration-200 hover:scale-105 sm:text-xs ${isActive ? "text-primary dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default BottomNavbar;
