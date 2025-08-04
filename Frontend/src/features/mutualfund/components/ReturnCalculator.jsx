import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import CountUp from "react-countup";
import { formatToINR } from "../utils/formaters";
import { calculateAbsoluteReturn } from "../utils/returnCalculatorHelper";
import { Button } from "@/components/ui/button";

const returnsMapping = [
  { label: "1 year", key: "return_1y", year: 1 },
  { label: "3 years", key: "return_3y", year: 3 },
  { label: "5 years", key: "return_5y", year: 5 },
];

function ReturnCalculator({ fund }) {
  const [amount, setAmount] = useState(20000);
  const [percentage, setPercentage] = useState(fund.return_1y);
  const debouncedValue = useDebounce(amount, 900);
  const [selectedYear, setSelectedYear] = useState(1); // Default to 1 year

  const value = Math.round(
    debouncedValue + (debouncedValue * percentage) / 100,
  );

  const updatePercentage = (item) => {
    const absoluteReturn = calculateAbsoluteReturn(fund[item.key], item.year);

    setPercentage(absoluteReturn);
    setSelectedYear(item.year);
  };

  return (
    <Card className="text-muted-foreground border-0 py-0 pb-6 sm:gap-8 sm:rounded-xl sm:border sm:py-10">
      <CardHeader className="px-0 sm:px-8">
        <CardTitle>
          <Button
            variant="ghost"
            className="sm:text-md h-7 rounded-full px-3 font-medium sm:px-4 sm:py-2"
          >
            Monthly Sip
          </Button>
          <Button
            variant="ghost"
            className="text-primary border-primary sm:text-md bg-primary/10 h-7 rounded-full px-3 font-medium sm:border sm:px-4 sm:py-2"
          >
            One-Time
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 sm:px-10">
        <div className="font-semibold">
          <span className="text-primary sm:text-foreground align-middle text-lg tracking-tighter tabular-nums">
            {formatToINR(amount)}
          </span>
          <span className="sm:text-foreground ml-4 align-middle sm:ml-2 sm:text-base">
            one-time
          </span>
        </div>

        <Slider
          className="mt-6 cursor-pointer [&_[role=slider]]:h-6 [&_[role=slider]]:w-8 [&_[role=slider]]:rounded-lg sm:[&_[role=slider]]:h-8 sm:[&_[role=slider]]:w-12 sm:[&_[role=slider]]:border-2"
          value={[amount]}
          onValueChange={(newValue) => setAmount(newValue[0])}
          min={500}
          max={100000}
          step={500}
        />

        <div className="mt-10 flex items-center justify-between sm:mt-12 sm:justify-start">
          <span className="sm:text-base">Over the past</span>
          <div className="flex sm:ml-6 sm:gap-2">
            {returnsMapping.map((item) => (
              <Button
                key={item.key}
                variant="outline"
                onClick={() => updatePercentage(item)}
                className={`sm:border-border h-7 rounded-full border-transparent px-3 shadow-none sm:h-9 sm:w-22 ${selectedYear === item.year && "sm:!bg-accent !bg-primary/10 text-primary sm:!border-foreground sm:text-foreground"}`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 border-t px-0 sm:px-10">
        <p className="text-sm sm:text-base">
          Total investment of {formatToINR(amount)}
        </p>
        <div className="text-foreground space-x-2 text-base font-medium sm:text-lg">
          <span>Would have become</span>
          <CountUp end={value} duration={0.5} separator="," prefix="₹" />
          <CountUp
            end={percentage}
            duration={0.5}
            separator=","
            prefix={percentage > 0 ? "(+" : "("}
            suffix=")%"
            className={percentage > 0 ? "text-positive" : "text-negative"}
            decimals={2}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default ReturnCalculator;
