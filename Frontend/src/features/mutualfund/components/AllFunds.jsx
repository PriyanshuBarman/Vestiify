import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  selectActiveColumn,
  selectFilters,
  setActiveColumn,
} from "@/store/slices/mutualFundSlice";
import { ChevronRightIcon, ChevronsLeftRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useGetFilteredFunds } from "../hooks/queries/externalQueries";
import { columnsConfig, getNextColumn } from "../utils/similarFundsTable";
import FundLogo from "./FundLogo";
import FundRating from "./FundRating";
import FilterBtns from "./filters/FilterBtns";
import { getMainDomain } from "../utils/getMainDomain";
import SectionHeading from "./SectionHeading";

function AllFunds() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const activeColumn = useSelector(selectActiveColumn);
  const isMobile = useIsMobile();

  const { data } = useGetFilteredFunds(filters);
  const funds = data?.pages[0].funds.slice(0, 7) || [];
  const totalCount = data?.pages[0].totalCount;

  // Mobile table callbacks
  const handleColumnClick = () => {
    dispatch(setActiveColumn(getNextColumn(activeColumn)));
  };

  if (!isMobile) return null;

  return (
    <section className="pb-20">
      <SectionHeading heading="All Mutual Funds" />
      <FilterBtns />

      <Table className="table-fixed">
        <TableHeader className="bg-background sticky top-0 z-10">
          <TableRow className="border-none text-xs">
            <TableHead className="w-[75%] pl-4 font-semibold">
              <span>{totalCount} funds</span>
            </TableHead>

            <TableHead
              onClick={handleColumnClick}
              className="border-muted-foreground flex items-center justify-end gap-1 rounded-xl pr-3 text-right font-medium"
            >
              <ChevronsLeftRight className="size-4 shrink-0" />
              <span className="border-muted-foreground border-b border-dashed">
                {columnsConfig[activeColumn].fullName}
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {funds?.map((fund) => (
            <TableRow key={fund.scheme_code}>
              <TableCell className="flex items-center gap-4 py-4 pl-4">
                <FundLogo
                  fundHouseDomain={getMainDomain(fund.detail_info)}
                  className="size-8.5"
                />
                <div>
                  <Link to={`/mutual-funds/${fund.scheme_code}`}>
                    <h4 className="Fund-Name text-foreground text-wrap">
                      {fund.short_name}
                    </h4>
                  </Link>
                  <div className="text-muted-foreground mt-0.5 flex flex-wrap gap-1.5 text-xs">
                    <span>{fund.fund_type}</span>
                    <span>
                      {fund.fund_category === "Fund of Funds"
                        ? fund.fund_category
                        : fund.fund_category.replace(/\bFund\b/, "")}
                    </span>
                    <FundRating rating={fund.fund_rating} />
                  </div>
                </div>
              </TableCell>

              <TableCell
                onClick={handleColumnClick}
                className="pr-4 text-right font-[450] break-words whitespace-normal"
              >
                {fund[activeColumn]
                  ? `${columnsConfig[activeColumn].prefix || ""}${fund[activeColumn]} ${columnsConfig[activeColumn].suffix || ""}`
                  : "NA"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Link
        to="/mutual-funds/all-funds"
        className="flex items-center justify-between gap-1 border-y px-4 py-4 text-sm font-medium"
      >
        <span>View all</span>
        <ChevronRightIcon size={20} />
      </Link>
    </section>
  );
}

export default AllFunds;
