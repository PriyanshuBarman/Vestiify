import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import { DEFAULT_COLUMNS, sortOptions } from "../constants/collectionConstants";
import { useGetFundsByFilter } from "../hooks/useGetFundsByFilter";
import {
  columnsConfig,
  getNewOrder,
  getNextColumn,
  sortPeersBy,
} from "../utils/collectionsHelper";

function CollectionPage() {
  const isMobile = useIsMobile();
  const [peers, setPeers] = useState();
  const [activeColumn, setActiveColumn] = useState("popularity"); // default active column (popularity)
  const [activeSortBy, setActiveSortBy] = useState("popularity");
  const [orderBy, setOrderBy] = useState("desc");
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);

  const { label, filters, description, img } = useLocation().state ?? {};
  const { data, isPending } = useGetFundsByFilter(filters);

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

  return (
    <section className="relative">
      <GoBackBar />
      <div className="top-0 z-10">
        <header className="bg-background mb-4 flex items-center gap-8 px-4 sm:mb-10">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-lg font-semibold sm:text-2xl">{label} </h2>
            <p className="text-muted-foreground text-sm">{description || ""}</p>
          </div>
          {img && (
            <Avatar className="size-18 rounded-lg border p-2 sm:h-24 sm:w-34 dark:mix-blend-hard-light">
              <AvatarImage src={img} />
            </Avatar>
          )}
        </header>
      </div>

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
    </section>
  );
}

export default CollectionPage;
