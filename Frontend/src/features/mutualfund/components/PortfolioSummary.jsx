import {
  BriefcaseBusinessIcon,
  PieChartIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useGetPortfolioSummary } from "../hooks/useGetPortfolioSummary";
import { formatToINR } from "@/utils/formatters";

function PortFolioSummary() {
  const { data = {} } = useGetPortfolioSummary();

  return (
    <div className="mx-4 mb-8 grid grid-cols-2 overflow-hidden rounded-2xl border tabular-nums sm:gap-4 sm:rounded-none sm:border-none lg:grid-cols-4">
      {/* Invested Amount Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm sm:font-semibold">
            Invested
          </h5>
          <p className="mt-1 text-sm font-medium sm:text-xl md:text-xl">
            {formatToINR(data.invested)}
          </p>
        </div>
        <PieChartIcon className="text-primary hidden size-8 sm:block" />
      </div>

      {/* Current Market Value Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm sm:font-semibold">
            Current
          </h5>
          <p
            className={`mt-1 text-sm font-medium sm:text-xl md:text-xl ${Number(data.current) >= Number(data.invested) ? "text-positive" : "text-negative"}`}
          >
            {formatToINR(data.current, 2)}
          </p>
        </div>
        <BriefcaseBusinessIcon className="hidden size-8 sm:block" />
      </div>

      {/* Total Returns Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm sm:font-semibold">
            Total Returns
          </h5>
          <p
            className={`mt-1 text-sm font-medium sm:text-xl md:text-xl ${data.returnPercent >= 0 ? "text-positive" : "text-negative"}`}
          >
            {formatToINR(data.pnl, 2)} ({data.returnPercent?.toFixed(2)}%)
          </p>
        </div>
        {data.returnPercent >= 0 ? (
          <TrendingUpIcon className="text-positive hidden size-8 sm:block" />
        ) : (
          <TrendingDownIcon className="text-negative hidden size-8 sm:block" />
        )}
      </div>

      {/* 1 Day Change Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-xl sm:border sm:py-6">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm sm:font-semibold">
            1 Day Change
          </h5>
          <p
            className={`mt-1 text-sm font-medium sm:text-xl md:text-xl ${data.dayChangePercent >= 0 ? "text-positive" : "text-negative"}`}
          >
            {formatToINR(data.dayChangeValue, 2)}(
            {data.dayChangePercent?.toFixed(2)}%)
          </p>
        </div>
        {data.dayChangePercent >= 0 ? (
          <TrendingUpIcon className="text-positive hidden size-8 sm:block" />
        ) : (
          <TrendingDownIcon className="text-negative hidden size-8 sm:block" />
        )}
      </div>
    </div>
  );
}

export default PortFolioSummary;
