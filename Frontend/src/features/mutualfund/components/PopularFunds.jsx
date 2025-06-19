import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useGetPopularFunds } from "../hooks/queries/externalQueries";
import CardLG from "./CardLG";
import CardSM from "./CardSM";
import SectionHeading from "./SectionHeading";

function PopularFunds() {
  const { data: funds } = useGetPopularFunds();
  const isMobile = useIsMobile();

  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading={"Popular Funds"} subHeading={"All Mutual Funds"} />
      <ScrollArea>
        <div className="flex justify-between gap-4 px-4 sm:m-1 sm:gap-3 sm:px-0">
          {funds?.map((fund) =>
            isMobile ? (
              <CardSM key={fund.unique_fund_code} fund={fund} />
            ) : (
              <CardLG
                key={fund.unique_fund_code}
                code={fund.unique_fund_code}
                shortCode={fund.short_code}
                shortName={fund.short_name}
                threeYearReturn={fund.three_year_return}
              />
            ),
          )}
        </div>
        <ScrollBar orientation="horizontal" className="max-sm:hidden" />
      </ScrollArea>
    </section>
  );
}

export default PopularFunds;
