import { CardHeader } from "@/components/ui/card";
import CountUp from "react-countup";

const returnMapping = {
  "1M": "return_1m",
  "6M": "return_6m",
  "1Y": "return_1y",
  "3Y": "return_3y",
  "5Y": "return_5y",
  All: "return_since_inception",
};

function ChartLegend({ selectedRange, fund }) {
  const returnPercent = fund[returnMapping[selectedRange]]; // return-percent for the selected range
  return (
    <CardHeader className="gap-0 pl-4">
      <div className="flex items-end gap-2">
        <span
          className={`text-2xl font-medium sm:text-3xl sm:font-medium ${returnPercent >= 0 ? "text-primary" : "text-red-400"}`}
        >
          <CountUp
            end={returnPercent}
            decimals={2}
            duration={0.7}
            useEasing={true}
            prefix={returnPercent > 0 ? "+" : ""}
            suffix="%"
          />
        </span>
        <span className="text-muted-foreground/90 text-xs font-medium sm:text-sm sm:font-semibold">
          {selectedRange}
          {selectedRange.includes("Y") && selectedRange !== "1Y"
            ? " annualized"
            : " return"}
        </span>
      </div>

      <div className="space-x-1 text-xs font-medium sm:text-sm">
        <span
          className={`${fund.day_change_percent >= 0 ? "text-primary" : "text-red-400"}`}
        >
          {fund.day_change_percent > 0 ? "+" : ""} {fund.day_change_percent}%
        </span>
        <span className="text-muted-foreground"> 1D</span>
      </div>
    </CardHeader>
  );
}

export default ChartLegend;
