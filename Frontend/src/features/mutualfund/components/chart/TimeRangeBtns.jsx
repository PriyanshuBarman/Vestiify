import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { isValidRange } from "../../utils/chartHelper";

function TimeRangeBtns({ setSelectedRange, selectedRange, fullChartData }) {
  return (
    <CardFooter className="mt-6 flex justify-center gap-2 sm:mt-0 sm:gap-4 sm:border-t sm:pt-4">
      {["1M", "6M", "1Y", "3Y", "5Y", "All"].map((timePeriod) => (
        <Button
          variant="outline"
          key={timePeriod}
          onClick={() => setSelectedRange(timePeriod)}
          disabled={isValidRange(timePeriod, fullChartData)}
          className={`text-muted-foreground sm:text-foreground h-7 w-11 rounded-full !bg-transparent shadow-none max-sm:border-0 sm:text-xs ${timePeriod === selectedRange && "!border-foreground sm:!bg-accent !bg-primary/10 text-primary sm:text-foreground"}`}
        >
          {timePeriod}
        </Button>
      ))}
    </CardFooter>
  );
}

export default TimeRangeBtns;
