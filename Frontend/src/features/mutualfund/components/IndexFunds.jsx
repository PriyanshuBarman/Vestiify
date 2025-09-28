import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router";
import FundLogo from "./FundLogo";
import SectionHeading from "./SectionHeading";
import { useGetIndexFunds } from "../hooks/useGetIndexFunds";
import { getMainDomain } from "../utils/getMainDomain";

function IndexFunds() {
  const { data: funds } = useGetIndexFunds();

  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading={"Index Funds"} subHeading={"View All"} />

      <ScrollArea>
        <div className="flex justify-between gap-4 px-4 sm:m-0.5 sm:gap-3 sm:px-0">
          {funds?.map((fund) => (
            <Link
              key={fund.scheme_code}
              to={`/mutual-funds/${fund.scheme_code}`}
            >
              <Card className="h-35 w-39 cursor-pointer justify-between gap-2 p-4 text-inherit transition-all duration-300 hover:scale-101 sm:h-42 sm:w-47">
                <FundLogo fundHouseDomain={getMainDomain(fund.detail_info)} />
                <CardTitle className="text-xs font-medium sm:text-sm">
                  {fund.short_name}
                </CardTitle>

                <CardFooter className="space-x-2 p-0 font-[550]">
                  <span className="text-foreground sm:text-md text-sm">
                    {fund.return_3y ? fund.return_3y.toFixed(1) + "%" : "NA"}
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    (3Y)
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="max-sm:hidden" />
      </ScrollArea>
    </section>
  );
}

export default IndexFunds;
