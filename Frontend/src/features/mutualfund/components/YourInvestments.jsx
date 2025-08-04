import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "react-responsive";
import { useGetPortfolioSummary } from "../hooks/queries/internalQueries";
import SectionHeading from "./SectionHeading";

function YourInvestments() {
  const { data: portfolio } = useGetPortfolioSummary();

  const hide = useMediaQuery({ maxWidth: 1199 });
  if (hide) return null;

  return (
    <div className="h-full w-full min-w-3xs">
      <SectionHeading heading={"Your investments"} subHeading={"Dashboard"} />
      <Card className="mt-4 min-w-3xs">
        <CardContent className="flex justify-between lg:flex-col xl:flex-row">
          <div>
            <span className="font-medium sm:text-lg">
              ₹{portfolio?.returnPercent}
            </span>
            <br />
            <span className="text-sm">Total Returns</span>
          </div>
          <div>
            <span className="font-medium sm:text-lg">
              ₹{portfolio?.current}
            </span>
            <br />
            <span className="text-sm">Current</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default YourInvestments;
