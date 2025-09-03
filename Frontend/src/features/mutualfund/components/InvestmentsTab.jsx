import { useIsMobile } from "@/hooks/useIsMobile";
import ScrollToTop from "@/layouts/ScrollToTop";
import { useEffect, useState } from "react";
import {
  useGetAllOrders,
  useGetPortfolio,
} from "../hooks/queries/internalQueries";
import { sortPortfolio } from "../utils/investmentTabHelper";
import SortByButton from "./filters/SortByButton";
import SectionCards from "./PortfolioSummary";
import PortfolioTableLG from "./tables/PortfolioTableLG";
import PortfolioTableSM from "./tables/PortfolioTableSM";
import PendingOrders from "./PendingOrders";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import LoadingState from "@/components/LoadingState";

const sortOptions = {
  current: "Current",
  invested: "Invested",
  pnl: "P&L",
  returnPercent: "Return",
  dayChangeValue: "Day Change (₹)",
  dayChangePercent: "Day Change (%)",
};

function InvestmentsTab() {
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("current");
  const [orderBy, setOrderBy] = useState("desc");

  const { data: orders } = useGetAllOrders();
  const { data, isPending } = useGetPortfolio();
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

  if (isPending) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <ScrollToTop />
      <PendingOrders />

      {!portfolio && !orders ? (
        <div className="flex flex-col items-center justify-center px-8">
          <img
            src="/StartInvesting.svg"
            alt="sip"
            className="size-50 md:size-96"
          />
          <h3 className="text-foreground-secondary mt-4 text-center font-medium sm:text-lg">
            You haven't invested yet.
          </h3>
          <p className="mt-2 text-xs sm:text-sm">
            When you invest in a fund, it will appear here
          </p>

          <Button asChild className="mt-6">
            <Link to="/mutual-funds/all-funds">Start Investing</Link>
          </Button>
        </div>
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
