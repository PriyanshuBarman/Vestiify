import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import CountUp from "react-countup";

const calculateAbsoluteReturn = (annualizedReturn, years) => {
  const annualizedReturnDecimal = annualizedReturn / 100;
  const absoluteReturnDecimal = Math.pow(1 + annualizedReturnDecimal, years) - 1;

  const absoluteReturnPercentage = absoluteReturnDecimal * 100;
  return absoluteReturnPercentage.toFixed(2);
};

function ReturnCalculator({ returns }) {
  const [amount, setAmount] = useState(20000);
  const [percentage, setPercentage] = useState(returns.year_1);
  const debouncedValue = useDebounce(amount, 900);

  const value = Math.round(debouncedValue + (debouncedValue * percentage) / 100);

  const updatePercentage = (percentage, n) => {
    const absoluteReturn = calculateAbsoluteReturn(percentage, n);
    setPercentage(absoluteReturn);
  };

  return (
    <Card className="text-muted-foreground/90 space-y-8 border-0 px-0 sm:rounded-xl sm:border sm:p-8 sm:py-12">
      <CardTitle>
        <Badge variant="ghost" className="text-[0.82rem] sm:text-sm">
          Monthly Sip
        </Badge>
        <Badge
          variant="ghost"
          className="text-primary bg-primary/10 ml-2 rounded-full px-4 py-1 text-[0.82rem] sm:bg-transparent sm:text-sm"
        >
          One-time
        </Badge>
      </CardTitle>

      <CardContent>
        <span className="text-primary align-middle text-lg font-medium">${amount}</span>
        <span className="ml-4 align-middle sm:ml-2 sm:text-lg sm:font-medium">one-time</span>
      </CardContent>

      <Slider
        className="cursor-pointer [&_[role=slider]]:h-6 [&_[role=slider]]:w-8 [&_[role=slider]]:rounded-md"
        value={[amount]}
        onValueChange={(newValue) => setAmount(newValue[0])}
        min={1000}
        max={100000}
        step={500}
      />

      <CardDescription className="flex items-center justify-between sm:justify-start">
        <span className="sm:text-base">Over the past</span>
        <div className="ml-6 flex gap-2">
          <Badge
            variant="ghost"
            onClick={() => updatePercentage(returns.year_1, 1)}
            className={`sm:bg-transparent sm:text-base ${percentage === returns.year_1 && "bg-primary/10 text-primary"}`}
          >
            1 years
          </Badge>
          <Badge
            variant="ghost"
            onClick={() => updatePercentage(returns.year_3, 3)}
            className={`sm:bg-transparent sm:text-base ${percentage === returns.year_3 && "bg-primary/10 text-primary"}`}
          >
            3 years
          </Badge>
          <Badge
            variant="ghost"
            onClick={() => updatePercentage(returns.year_5, 5)}
            className={`sm:bg-transparent sm:text-base ${percentage === returns.year_5 && "bg-primary/10 text-primary"}`}
          >
            5 years
          </Badge>
        </div>
      </CardDescription>

      <CardFooter className="flex flex-col items-start border-t">
        <p className="text-xs sm:text-base">Total investment of ${amount}</p>
        <p className="text-foreground text-base font-medium sm:text-lg">
          Would have become $
          <CountUp end={value} duration={0.5} separator="," />
          <span className="text-primary">(+{percentage}%)</span>
        </p>
      </CardFooter>
    </Card>
  );
}

export default ReturnCalculator;
