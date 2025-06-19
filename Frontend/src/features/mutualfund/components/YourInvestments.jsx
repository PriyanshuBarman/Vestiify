import { Card } from "@/components/ui/card";
import { useGetPortfolioSummary } from "../hooks/queries/internalQueries";
import SectionHeading from "./SectionHeading";

function YourInvestments() {
  const { data: portfolio } = useGetPortfolioSummary();

  return (
    <div className="h-full w-full min-w-3xs max-lg:hidden">
      <SectionHeading heading={"Your investments"} subHeading={"Dashboard"} />
      <Card className="mt-4 min-w-3xs justify-between lg:flex-col xl:flex-row">
        <div>
          <span className="font-medium sm:text-lg">₹{portfolio?.totalRoi}</span>
          <br />
          <span className="text-sm">Total Returns</span>
        </div>
        <div>
          <span className="font-medium sm:text-lg">₹{portfolio?.totalMv}</span>
          <br />
          <span className="text-sm">Current</span>
        </div>
      </Card>
    </div>
  );
}

export default YourInvestments;
