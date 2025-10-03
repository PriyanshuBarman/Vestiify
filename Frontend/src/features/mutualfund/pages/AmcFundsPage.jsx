import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import { DEFAULT_COLUMNS, sortOptions } from "../constants/collectionConstants";
import { useGetAmcFunds } from "../hooks/useGetAmcFunds";
import {
  columnsConfig,
  getNewOrder,
  getNextColumn,
  sortPeersBy,
} from "../utils/collectionsHelper";
import FilterCategoryButton from "../components/filters/FilterCategoryButton";
import FundLogo from "../components/FundLogo";
import { formatToINR } from "../utils/formaters";

function AmcFundsPage() {
  const isMobile = useIsMobile();
  const { amcName, amcCode, description, fundHouseDomain, aum, rank } =
    useLocation().state ?? {};
  const { data, isPending } = useGetAmcFunds(amcCode);
  const [peers, setPeers] = useState();
  const [activeColumn, setActiveColumn] = useState("popularity"); // default active column (popularity)
  const [activeSortBy, setActiveSortBy] = useState("popularity");
  const [orderBy, setOrderBy] = useState("desc");
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);
  const [activeCategory, setActiveCategory] = useState("Equity");

  useEffect(() => {
    if (data) setPeers(data[activeCategory]);
  }, [data, activeCategory]);

  // Desktop table callback
  const handleDesktopClick = (clicked) => {
    const newOrder = getNewOrder(clicked, activeColumn, orderBy);
    setPeers((prevPeers) => sortPeersBy(prevPeers, clicked, newOrder));
    setActiveColumn(clicked);
    setOrderBy(newOrder);
  };

  // Mobile table callbacks
  const handleColumnClick = () => {
    setActiveColumn((prev) => getNextColumn(prev));
  };

  const handleSortChange = (columnKey) => {
    if (columnKey === "popularity") {
      setActiveSortBy("popularity");
      setPeers(data);
      return;
    }
    setActiveSortBy(columnKey);
    setActiveColumn(columnKey);
    setPeers((prevPeers) => sortPeersBy(prevPeers, columnKey, orderBy));
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrder);
    setPeers((prevPeers) => sortPeersBy(prevPeers, activeColumn, newOrder));
  };

  const categories = data ? Object.keys(data) : [];

  return (
    <div className="relative">
      <GoBackBar />
      <section className="top-0 z-10 mb-4">
        <div className="bg-background flex items-center justify-between gap-8 px-4 sm:mb-10 sm:justify-start sm:gap-12">
          <div>
            <h2 className="text-lg font-semibold sm:text-2xl">{amcName} </h2>
            <p className="text-muted-foreground font mt-2 space-x-2 text-xs sm:mt-4 sm:text-sm">
              <span>Rank(total asset):</span>
              <span className="text-sm font-medium">#{rank} in India</span>
            </p>
            <p className="text-muted-foreground font space-x-2 sm:text-sm">
              <span className="text-xs">Total AUM </span>
              <span className="text-sm font-medium">
                {formatToINR(aum / 10)}Cr
              </span>
            </p>
          </div>
          <FundLogo
            fundHouseDomain={fundHouseDomain}
            className="size-18 border sm:size-24"
          />
        </div>
      </section>

      <FilterCategoryButton
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {isMobile ? (
        // ----------- MOBILE TABLE -----------
        <TableSM
          funds={peers}
          isPending={isPending}
          activeColumn={activeColumn}
          activeSortBy={activeSortBy}
          order={orderBy}
          onColumnClick={handleColumnClick}
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
          sortOptions={sortOptions}
          columnsConfig={columnsConfig}
          show="sortByBtn"
        />
      ) : (
        // ----------- LARGE SCREEN TABLE -----------
        <TableLG
          funds={peers}
          isPending={isPending}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          activeColumn={activeColumn}
          sortOrder={orderBy}
          onClick={handleDesktopClick}
          columnsConfig={columnsConfig}
        />
      )}
    </div>
  );
}

export default AmcFundsPage;
