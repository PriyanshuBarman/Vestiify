import { selectActiveTabIndex } from "@/store/slices/mutualFundSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const TABS = [
  { name: "Explore", hash: "#explore" },
  { name: "Investments", hash: "#investments" },
  { name: "SIPs", hash: "#sip" },
  { name: "Watchlist", hash: "#watchlist" },
];

function Tabs() {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const location = useLocation();

  if (location.pathname !== "/mutual-funds" && !location?.hash) return;

  return (
    <div className="Tabs mb-8 space-x-2 border-b py-2 pl-4 text-[0.9rem] font-medium sm:space-x-4 sm:pl-0 sm:text-base">
      {TABS.map((tab, idx) => (
        <a
          key={tab.name}
          href={tab.hash}
          className={` ${activeTabIndex === idx ? "text-foreground border-foreground border-b-2 font-semibold sm:border-b-3" : "text-muted-foreground"} p-2 transition-all duration-200 ease-in-out`}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
}

export default Tabs;
