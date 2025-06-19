import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronsLeftRight } from "lucide-react";
import { useState } from "react";
import FundLogo from "../FundLogo";
import FilterBtn from "./FilterBtn";

const columns = [
  { label: "Current(Invested)", data1: "marketValue", data2: "investedAmt", unit1: "₹", unit2: "₹" },
  { label: "Returns(%)", data1: "pnl", data2: "roi", unit1: "₹", unit2: "%" },
  { label: "Day change(%)", data1: "dayChangeValue", data2: "dayChangePercent", unit1: "₹", unit2: "%" },
];

function MobileTable({ portfolio, sortBy, setSortBy, order, setOrder }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColumn = columns[activeIndex];

  const handleNextColumn = () => {
    setActiveIndex((prev) => (prev + 1) % columns.length);
  };

  const getColor = (fund) => {
    switch (activeColumn.label) {
      case "Current(Invested)":
        return fund.marketValue >= fund.investedAmt ? "text-primary" : "text-red-500";

      case "Returns(%)":
        return fund.pnl >= 0 ? "text-primary" : "text-red-500";

      default:
        return "text-primary";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl">
      <Table>
        <TableHeader>
          <TableRow className="border-b-transparent text-[0.8rem]">
            <TableHead className="text-muted-foreground">
              <FilterBtn {...{ sortBy, setSortBy, order, setOrder }} />
            </TableHead>

            <TableHead onClick={handleNextColumn}>
              <div className="text-muted-foreground flex cursor-pointer items-center justify-end gap-0.5 pr-2 transition-colors">
                <ChevronsLeftRight className="size-4" />
                <span>{activeColumn.label}</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {portfolio?.map((item) => (
            <TableRow key={item.fundCode}>
              <TableCell className="flex items-center gap-4 py-4 pl-4">
                <FundLogo shortCode={item.shortCode} />

                <div>
                  <h4 className="font-medium text-wrap">{item.shortName} Fund</h4>
                  <p className="text-muted-foreground mt-1 flex items-center text-xs font-medium">{item.fundType}</p>
                </div>
              </TableCell>

              <TableCell className="pr-4">
                <p
                  className={`flex justify-end font-medium ${
                    activeIndex === 1 && "flex-row-reverse justify-start"
                  } ${getColor(item)}`}
                >
                  <span>{activeColumn.unit1}</span>
                  <span>{item[activeColumn.data1]}</span>
                </p>

                <p className="text-muted-foreground flex justify-end text-xs">
                  {activeIndex === 0 ? (
                    <>
                      ( <span> {activeColumn.unit2}</span>
                      <span>{item[activeColumn.data2]} </span>)
                    </>
                  ) : (
                    <>
                      ( <span>{item[activeColumn.data2]} </span>
                      <span> {activeColumn.unit2}</span>)
                    </>
                  )}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MobileTable;
