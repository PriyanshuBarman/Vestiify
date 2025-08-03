import GoBackBar from "@/components/GoBackBar";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  selectActiveColumn,
  selectFilters,
  setActiveColumn,
  setFilters,
} from "@/store/slices/mutualFundSlice";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import TableLG from "../components/tables/TableLG";
import TableSM from "../components/tables/TableSM";
import { useFilteredFunds } from "../hooks/queries/externalQueries";
import {
  columnsConfig,
  getNewOrder,
  getNextColumn,
} from "../utils/collectionsHelper";
import FilterButtons from "../components/filters/FilterButtons";

const DEFAULT_COLUMNS = [
  "return_1y",
  "return_3y",
  "return_5y",
  "return_since_inception",
  "aum",
];

function AllFundsPage() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);
  const activeColumn = useSelector(selectActiveColumn);
  const filters = useSelector(selectFilters);
  const orderBy = filters.order_by;

  // Pagination
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useFilteredFunds(filters);

  const totalCount = data?.pages[0].totalCount;
  const funds = data?.pages.flatMap((page) => page.funds) || []; // automatically adds next page funds to the array

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  // Desktop table callback
  const handleDesktopClick = (clicked) => {
    const newOrder = getNewOrder(clicked, activeColumn, orderBy);
    dispatch(setActiveColumn(clicked));
    dispatch(setFilters({ ...filters, sort_by: clicked, order_by: newOrder }));
  };

  // Mobile table callbacks
  const handleColumnClick = () => {
    dispatch(setActiveColumn(getNextColumn(activeColumn)));
  };

  return (
    <section>
      <GoBackBar title="All Mutual Funds" />
      <FilterButtons />
      {isMobile ? (
        <TableSM
          show="fundCount"
          funds={funds}
          totalCount={totalCount}
          activeColumn={activeColumn}
          onColumnClick={handleColumnClick}
          columnsConfig={columnsConfig}
          // Pagination props
          enablePagination={true}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
          inViewRef={inViewRef}
          />
        ) : (
          <TableLG
          funds={funds}
          totalCount={totalCount}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          activeColumn={activeColumn}
          sortOrder={orderBy}
          onClick={handleDesktopClick}
          columnsConfig={columnsConfig}
          // Pagination props
          isFetching={isFetching}
          enablePagination={true}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          inViewRef={inViewRef}
        />
      )}
    </section>
  );
}

export default AllFundsPage;
