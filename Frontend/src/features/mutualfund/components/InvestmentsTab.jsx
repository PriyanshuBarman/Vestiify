import { useIsMobile } from "@/hooks/useIsMobile";
import ScrollToTop from "@/layouts/ScrollToTop";
import { useEffect, useState } from "react";
import {
  useGetPortfolio
} from "../hooks/queries/internalQueries";
import { sortPortfolio } from "../utils/investmentTabHelper";
import SortByButton from "./filters/SortByButton";
import SectionCards from "./PortfolioSummary";
import PortfolioTableLG from "./tables/PortfolioTableLG";
import PortfolioTableSM from "./tables/PortfolioTableSM";
import PendingOrders from "./PendingOrders";

const sortOptions = {
  current: "Current",
  invested: "Invested",
  pnl: "P&L",
  returnPercent: "Return",
  dayChangeValue: "Day Change (₹)",
  dayChangePercent: "Day Change (%)",
};

function InvestmentsTab() {
  const [portfolio, setPortfolio] = useState();
  const [sortBy, setSortBy] = useState("current");
  const [orderBy, setOrderBy] = useState("desc");

  const { data } = useGetPortfolio();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (data) setPortfolio(data);
  }, [data]);

  const handleSortChange = (columnKey) => {
    setSortBy(columnKey);
    setPortfolio((prev) => sortPortfolio(prev, columnKey, orderBy));
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrder);
    setPortfolio((prev) => sortPortfolio(prev, sortBy, newOrder));
  };

  return (
    <div className="space-y-4">
      <ScrollToTop />
      <PendingOrders />

      {!portfolio ? (
        <h2 className="text-center">Fund Not Available On Portfolio</h2>
      ) : (
        <>
          <SectionCards />
          <SortByButton
            sortOptions={sortOptions}
            activeSortBy={sortBy}
            onSortChange={handleSortChange}
            onOrderChange={handleOrderChange}
            order={orderBy}
          />

          {isMobile ? (
            <PortfolioTableSM portfolio={portfolio} />
          ) : (
            <PortfolioTableLG portfolio={portfolio} />
          )}
        </>
      )}
    </div>
  );
}

export default InvestmentsTab;


