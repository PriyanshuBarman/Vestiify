import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { getStartTimeStamp } from "../../utils/chartHelper";

function TimeRangeBtns({ setSelectedRange, selectedRange, fullChartData }) {
  const isDisable = (timePeriod) => {
    const oldestData = fullChartData[0]?.timestamp; // the oldest record
    const requestedStart = getStartTimeStamp(timePeriod, fullChartData);
    return oldestData > requestedStart;
  };

  return (
    <CardFooter className="flex justify-center gap-2 sm:gap-4 mt-6 sm:border-t  sm:mt-0 sm:pt-4">
      {["1M", "6M", "1Y", "3Y", "5Y"].map((timePeriod) => (
        <Button
          variant="outline"
          key={timePeriod}
          onClick={() => setSelectedRange(timePeriod)}
          disabled={isDisable(timePeriod)}
          className={`text-muted-foreground sm:text-foreground h-7 w-11 rounded-full !bg-transparent shadow-none max-sm:border-0 sm:text-xs ${timePeriod === selectedRange && "!border-foreground sm:!bg-accent !bg-primary/10 text-primary sm:text-foreground"}`}
        >
          {timePeriod}
        </Button>
      ))}
    </CardFooter>
  );
}

export default TimeRangeBtns;
