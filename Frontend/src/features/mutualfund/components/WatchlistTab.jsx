import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function WatchlistTab() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <img src="/NoData.svg" alt="sip" className="size-60 md:size-96" />
        <h3 className="text-foreground-secondary font-medium sm:text-lg">
          Not watching any funds
        </h3>
        <p className="text-xs sm:text-sm">
          When you watch a fund, it will appear here
        </p>

        <Button asChild className="mt-4">
          <Link to="/mutual-funds/all-funds">Explore all funds</Link>
        </Button>
      </div>
    </div>
  );
}

export default WatchlistTab;
