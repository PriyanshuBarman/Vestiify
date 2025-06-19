import { CardHeader } from "@/components/ui/card";

function ChartLegend({ selectedRange, returnPercentage, dayChange }) {
  return (
    <CardHeader className="gap-0 pl-4">
      <div className="flex items-end gap-2">
        <span
          className={`text-2xl font-medium sm:text-3xl sm:font-medium ${returnPercentage >= 0 ? "text-primary" : "text-red-400"}`}
        >
          {returnPercentage}%
        </span>
        <span className="text-muted-foreground/90 text-xs font-medium sm:text-sm sm:font-semibold">
          {selectedRange}
          {selectedRange.includes("Y") && selectedRange !== "1Y" ? " annualized" : " return"}
        </span>
      </div>

      <div className="space-x-1 text-xs font-medium sm:text-sm">
        <span className={`${dayChange >= 0 ? "text-primary" : "text-red-400"}`}>{dayChange}%</span>
        <span className="text-muted-foreground"> 1D</span>
      </div>
    </CardHeader>
  );
}

export default ChartLegend;
