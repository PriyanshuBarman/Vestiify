import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router";
import FundLogo from "./FundLogo";
import SectionHeading from "./SectionHeading";
import { useIndexFunds } from "../hooks/queries/externalQueries";

function IndexFunds() {
  const { data: funds } = useIndexFunds();

  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading={"Index Funds"} subHeading={"View All"} />

      <ScrollArea>
        <div className="flex justify-between gap-4 px-4 sm:m-1 sm:gap-3 sm:px-0">
          {funds?.map((fund) => (
            <Link to={`/mutual-funds/${fund.scheme_code}`} key={fund.id}>
              <Card className="h-35 w-39 cursor-pointer justify-between text-inherit transition-normal duration-300 hover:scale-101 sm:h-42 sm:w-47">
                <FundLogo logoCode={fund.short_code} />
                <CardTitle className="text-xs font-medium sm:text-sm">
                  {fund.short_name}
                </CardTitle>

                <CardDescription className="space-x-4 font-medium">
                  <span className="text-foreground sm:text-base">
                    {fund.return_3y ? fund.return_3y + "%" : "NA"}
                  </span>
                  <span className="font-normal sm:font-semibold">3Y</span>
                </CardDescription>
              </Card>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}

export default IndexFunds;
