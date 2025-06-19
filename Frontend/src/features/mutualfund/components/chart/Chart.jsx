import { CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useState } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { useGetChart } from "../../hooks/queries/externalQueries";
import { getChartData, getDayChange } from "../../utils/chartHelper";
import ChartLegend from "./ChartLegend";
import CustomTooltipContent from "./CustomTooltipContent";
import TimeRangeBtns from "./TimeRangeBtns";

function Chart({ fund }) {
  const [selectedRange, setSelectedRange] = useState("1Y");

  const { data: fullChartData, isLoading } = useGetChart(fund?.code);

  let chartData, returnPercentage, dayChange;

  const isNewFund = fullChartData?.length < 30;

  if (isNewFund) {
    chartData = fullChartData;
    returnPercentage = fund?.returns.inception.toFixed(2);
    dayChange = getDayChange(fullChartData);
  } else if (!isLoading && !isNewFund) {
    ({ returnPercentage, chartData } = getChartData(fullChartData, selectedRange));

    dayChange = getDayChange(fullChartData);
  }

  return (
    <div className="relative overflow-x-hidden">
      {isLoading && (
        <img
          className="absolute top-1/2 left-1/2 m-auto size-15 -translate-1/2 animate-pulse"
          alt="loading icon"
          src="/electric.svg"
        />
      )}
      <ChartLegend
        selectedRange={isNewFund ? "" : selectedRange}
        returnPercentage={returnPercentage}
        dayChange={dayChange}
      />
      <CardContent className="mt-6">
        <ChartContainer
          className="h-55 w-full sm:h-78"
          config={{
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          }}
        >
          {chartData?.length !== 0 && chartData?.length < 2 && !isLoading ? (
            <p className="text-primary w-full text-center whitespace-pre-line italic sm:text-lg">
              No Chart Data Available for {selectedRange}
            </p>
          ) : (
            <LineChart accessibilityLayer data={chartData}>
              <XAxis dataKey="date" hide />

              {fullChartData?.length && (
                <YAxis domain={[(dataMin) => dataMin - dataMin * 0.05, (dataMax) => dataMax + dataMax * 0.01]} hide />
              )}
              <ChartTooltip content={<CustomTooltipContent />} />
              <Line
                dataKey="nav"
                type="natural"
                stroke={returnPercentage > 0 ? "var(--primary)" : "#FF6467"}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
      <TimeRangeBtns
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        fullChartData={fullChartData || []}
      />
    </div>
  );
}

export default Chart;
