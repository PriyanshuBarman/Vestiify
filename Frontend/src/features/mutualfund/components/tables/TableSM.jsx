import LoadingState from "@/components/LoadingState";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FundRating from "@/features/mutualfund/components/FundRating";
import { ChevronsLeftRight, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { formatFundCategory, formatToINR } from "../../utils/formaters";
import FundLogo from "../FundLogo";
import SortByButton from "../filters/SortByButton";

/**
 *  Reusable Small screen table with pagination support
 */

function TableSM({
  funds,
  isPending, // Becomes true only when the first request is loading
  totalCount,
  activeColumn,
  activeSortBy,
  order,
  onColumnClick,
  onSortChange,
  onOrderChange,
  sortOptions,
  columnsConfig,
  show,
  // Pagination props
  enablePagination = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  isFetching = false,
  inViewRef = null,
}) {
  const getValue = (fund) => {
    if (activeColumn === "popularity") {
      return fund["return_3y"] ? `${fund["return_3y"]}%` : "NA";
    }
    if (activeColumn === "aum") {
      return fund[activeColumn]
        ? `${formatToINR(fund[activeColumn] / 10)}Cr`
        : "NA";
    }
    return fund[activeColumn]
      ? `${columnsConfig[activeColumn].prefix || ""}${fund[activeColumn]} ${columnsConfig[activeColumn].suffix || ""}`
      : "NA";
  };

  return (
    <ScrollArea className="overflow-x-auto">
      <Table className="table-fixed">
        <TableHeader className="bg-background sticky top-0 z-10 text-xs">
          <TableRow>
            <TableHead className="w-[75%] pl-4 font-semibold">
              {show === "fundCount" ? (
                <span className="tabular-nums">
                  {totalCount?.toLocaleString()} funds
                </span>
              ) : show === "sortByBtn" ? (
                <SortByButton
                  order={order}
                  sortOptions={sortOptions}
                  activeSortBy={activeSortBy}
                  onSortChange={onSortChange}
                  onOrderChange={onOrderChange}
                  columnsConfig={columnsConfig}
                />
              ) : null}
            </TableHead>

            <TableHead
              onClick={onColumnClick}
              className="border-muted-foreground flex items-center justify-end gap-1 rounded-xl pr-3 text-right font-medium"
            >
              <ChevronsLeftRight className="size-4 shrink-0" />
              <span className="border-muted-foreground border-b border-dashed">
                {
                  columnsConfig[
                    activeColumn === "popularity" ? "return_3y" : activeColumn
                  ].name
                }
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {funds?.map((fund) => (
            <TableRow key={fund.scheme_code}>
              <TableCell className="flex items-center gap-4 py-4 pl-4">
                <FundLogo fundHouseDomain={fund.detail_info} />
                <div>
                  <Link to={`/mutual-funds/${fund.scheme_code}`}>
                    <h4 className="Fund-Name text-foreground text-wrap">
                      {fund.short_name}
                    </h4>
                  </Link>
                  <div className="text-muted-foreground mt-1 flex flex-wrap gap-1 text-xs">
                    <span>{fund.fund_type}</span>
                    <span>{formatFundCategory(fund.fund_category)}</span>
                    <span>
                      <FundRating rating={fund.fund_rating} />
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell
                onClick={onColumnClick}
                className="pr-4 text-right font-[450] break-words whitespace-normal"
              >
                {getValue(fund)}
              </TableCell>
            </TableRow>
          ))}

          {/* =============== Loading States =============== */}
          {/* First Request Loading State */}
          {isPending && (
            <TableRow className="border-none">
              <TableCell colSpan={2} className="p-0">
                <LoadingState fullPage className="h-[calc(100vh-200px)]" />
              </TableCell>
            </TableRow>
          )}
          {/* Pagination loader row - only show if pagination is enabled */}
          {enablePagination && (
            <TableRow>
              <TableCell colSpan={2} className="p-0">
                <div
                  ref={inViewRef}
                  className="flex h-16 w-full items-center justify-center"
                >
                  {isFetchingNextPage && hasNextPage && (
                    <Loader2 className="animate-spin" />
                  )}
                  {!hasNextPage && !isFetching && (
                    <p className="text-muted-foreground text-xs opacity-50">
                      No more funds
                    </p>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default TableSM;
