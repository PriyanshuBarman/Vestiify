import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { useGetPortfolio } from "../../hooks/queries/internalQueries";
import SortByButton from "../filters/SortByButton";
import PortfolioTableLG from "../tables/PortfolioTableLG";
import PortfolioTableSM from "../tables/PortfolioTableSM";
import SectionCards from "./PortfolioSummary";

const sortOptions = {
  name: "Name",
  current: "Current",
  invested: "Invested",
  pnl: "P&L",
  returnPercent: "Return",
};

function InvestmentsTab() {
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("desc");

  const { data } = useGetPortfolio();
  const [portfolio, setPortfolio] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!data) return;
    const sortedData = data.toSorted((fundA, fundB) => {
      if (sortBy === "name") {
        return order === "asc"
          ? fundA.fundName.localeCompare(fundB.fundName)
          : fundB.fundName.localeCompare(fundA.fundName);
      }
      return order === "asc"
        ? fundA[sortBy] - fundB[sortBy]
        : fundB[sortBy] - fundA[sortBy];
    });
    setPortfolio(sortedData);
  }, [data, sortBy, order]);

  // Callbacks for SortByBtn
  const handleSortChange = (value) => setSortBy(value);
  const handleOrderChange = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="space-y-4">
      <SectionCards />

      <SortByButton
        sortOptions={sortOptions}
        activeSortBy={sortBy}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        order={order}
      />

      {isMobile ? (
        <PortfolioTableSM portfolio={portfolio} />
      ) : (
        <PortfolioTableLG portfolio={portfolio} />
      )}
    </div>
  );
}

export default InvestmentsTab;
