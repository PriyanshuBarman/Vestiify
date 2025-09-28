import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParams } from "react-router";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import {
  collectionConfig,
  DEFAULT_COLUMNS,
} from "../constants/collectionConstants";
import { useEffect, useState } from "react";
import { useGetCategoryFundList } from "../hooks/useGetCategoryFundList";
import {
  columnsConfig,
  getNextColumn,
  getNewOrder,
} from "../utils/collectionsHelper";
import { sortPeersBy } from "../utils/collectionsHelper";
import GoBackBar from "@/components/GoBackBar";

const sortOptions = {
  return_1y: "1Y Returns",
  return_3y: "3Y Returns",
  return_5y: "5Y Returns",
  fund_rating: "Rating",
  expense_ratio: "Expense Ratio",
  aum: "Fund Size",
  lump_min: "Min Lumpsum",
  sip_min: "Min SIP",
};

function CollectionPage() {
  const isMobile = useIsMobile();
  const [peers, setPeers] = useState();
  const [activeColumn, setActiveColumn] = useState("return_1y"); // default active column (return_1y)
  const [activeSortBy, setActiveSortBy] = useState("return_1y");
  const [orderBy, setOrderBy] = useState("desc");
  const { name } = useParams();

  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);

  const { data } = useGetCategoryFundList(name, collectionConfig[name]?.url);

  useEffect(() => {
    if (data) setPeers(data);
  }, [data]);

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
    setActiveSortBy(columnKey);
    setActiveColumn(columnKey);
    setPeers((prevPeers) => sortPeersBy(prevPeers, columnKey, orderBy));
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrder);
    setPeers((prevPeers) => sortPeersBy(prevPeers, activeColumn, newOrder));
  };

  return (
    <section className="relative">
      <GoBackBar />
      <header className="bg-background mb-4 flex items-center gap-8 px-4 sm:mb-10">
        <div className="space-y-2 sm:space-y-4">
          <h2 className="text-lg font-semibold sm:text-2xl">{name} </h2>
          <p className="text-muted-foreground text-sm">
            {collectionConfig[name].description || ""}
          </p>
        </div>
        <Avatar className="size-18 rounded-lg border p-2 sm:h-24 sm:w-34 dark:mix-blend-hard-light">
          <AvatarImage src={`/${name}.svg`} />
        </Avatar>
      </header>

      {isMobile ? (
        // ----------- MOBILE TABLE -----------
        <TableSM
          funds={peers}
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
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          activeColumn={activeColumn}
          sortOrder={orderBy}
          onClick={handleDesktopClick}
          columnsConfig={columnsConfig}
        />
      )}
    </section>
  );
}

export default CollectionPage;
