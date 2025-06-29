import { BriefcaseBusinessIcon, PieChartIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useGetPortfolioSummary } from "../../hooks/queries/internalQueries";

function SectionCards() {
  const { data } = useGetPortfolioSummary();
  const { current, invested, pnl, returnPercent, dayChangeValue, dayChangePercent } = data ?? {};

  return (
    <div className="mx-4 mb-8 grid grid-cols-2 overflow-hidden rounded-lg border sm:gap-4 sm:rounded-none sm:border-none lg:grid-cols-4">
      
      {/* Market Value Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-lg sm:border">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm">Current</h5>
          <p className="mt-1 text-sm font-medium sm:text-xl md:text-xl">₹ {current}</p>
        </div>
        <PieChartIcon className="text-primary hidden size-8 sm:block" />
      </div>

      {/* Total Returns Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-lg sm:border">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm">Total Returns</h5>
          <p
            className={`mt-1 text-sm font-medium sm:text-xl md:text-xl ${pnl >= 0 ? "text-green-600" : "text-red-500"}`}
          >
            ₹ {pnl} ({returnPercent}%)
          </p>
        </div>
        <TrendingUpIcon className="hidden size-8 text-green-600 sm:block" />
      </div>

      {/* Invested Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-lg sm:border">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm"> Invested</h5>
          <p className="mt-1 text-sm font-medium sm:text-xl md:text-xl">₹ {invested}</p>
        </div>
        <BriefcaseBusinessIcon className="hidden size-8 text-blue-600 sm:block" />
      </div>

      {/* 1 Day Change Card */}
      <div className="Card bg-card flex items-center justify-between border-0 p-4 sm:rounded-lg sm:border">
        <div>
          <h5 className="text-muted-foreground text-xs sm:text-sm">1 Day Change</h5>
          <p className="mt-1 text-sm font-medium text-red-500 sm:text-xl md:text-xl">
            ₹ {dayChangeValue} ({dayChangePercent}%)
          </p>
        </div>
        <TrendingDownIcon className="hidden size-8 text-red-600 sm:block" />
      </div>
    </div>
  );
}

export default SectionCards;
