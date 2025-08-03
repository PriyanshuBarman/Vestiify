import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsLeftRight } from "lucide-react";
import { useState } from "react";
import FundLogo from "../FundLogo";
import { formatToINR } from "../../utils/formaters";

const columns = [
  {
    label: "Current (Invested)",
    data1: "current",
    data2: "invested",
    unit2: "₹",
  },
  {
    label: "Returns (%)",
    data1: "pnl",
    data2: "returnPercent",
    unit2: "%",
  },
  {
    label: "Day change (%)",
    data1: "dayChangeValue",
    data2: "dayChangePercent",
    unit2: "%",
  },
];

function PortfolioTableSM({ portfolio }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColumn = columns[activeIndex];

  const handleNextColumn = () => {
    setActiveIndex((prev) => (prev + 1) % columns.length);
  };

  const getColor = (fund) => {
    switch (activeColumn.label) {
      case "Current (Invested)":
        return fund.current >= fund.invested ? "text-primary" : "text-red-500";

      case "Returns (%)":
        return fund.pnl >= 0 ? "text-primary" : "text-red-500";

      default:
        return "text-primary";
    }
  };

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="border-b-transparent text-xs">
          <TableHead className="pl-4">{portfolio.length} funds</TableHead>

          <TableHead onClick={handleNextColumn} className="w-[25%] pr-4">
            <div className="flex cursor-pointer items-center justify-end gap-2 transition-colors">
              <ChevronsLeftRight className="size-3.5 shrink-0" />
              <span className="border-muted-foreground border-b border-dashed">
                {activeColumn.label}
              </span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {portfolio?.map((item) => (
          <TableRow key={item.schemeCode}>
            <TableCell className="flex items-center gap-4 py-4 pl-4">
              <FundLogo logoCode={item.logoCode} />

              <div>
                <h4 className="font-medium text-wrap">{item.shortName} Fund</h4>
                <p className="text-muted-foreground mt-1 flex items-center text-xs font-medium">
                  {item.fundType}
                </p>
              </div>
            </TableCell>

            <TableCell className="pr-4">
              <span
                className={`flex justify-end font-medium ${getColor(item)}`}
              >
                {formatToINR(item[activeColumn.data1])}
              </span>

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
  );
}

export default PortfolioTableSM;
