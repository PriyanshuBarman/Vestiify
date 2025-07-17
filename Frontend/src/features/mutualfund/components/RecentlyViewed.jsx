import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronsUpDown, StarIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecentlyViewedFunds } from "../hooks/useRecentlyViewedFunds";
import CardLG from "./CardLG";
import FundLogo from "./FundLogo";
import FundRating from "@/components/FundRating";

const labelArr = [
  { key: "return_1y", label: "1Y Returns" },
  { key: "return_3y", label: "3Y Returns" },
  { key: "return_5y", label: "5Y Returns" },
  { key: "expense_ratio", label: "Expense Ratio" },
];

function RecentlyViewed() {
  const [activeLabelIdx, setActiveLabelIdx] = useState(0);
  const recentlyViewedFunds = useRecentlyViewedFunds();

  // Loop ♾️
  const handleClick = () => {
    const nextIndex = (activeLabelIdx + 1) % labelArr.length;
    setActiveLabelIdx(nextIndex);
  };

  const isMobile = useIsMobile();

  return (
    <section>
      <h2 className="pl-4 font-medium sm:pl-0 sm:text-xl">Recently Viewed</h2>

      <div className="mt-6 flex items-center justify-between pl-4 sm:px-0">
        <h4 className="text-muted-foreground text-[0.8rem] font-medium sm:text-base">Fund Name</h4>
        <Button onClick={handleClick} variant="ghost" className="flex gap-1 text-[0.8rem] sm:hidden">
          <ChevronsUpDown strokeWidth={2.5} />
          {labelArr[activeLabelIdx].label}
        </Button>
      </div>

      <ScrollArea>
        <div className="mt-4 w-full gap-4 space-y-5 px-4 sm:my-4 sm:flex sm:space-y-0 sm:px-0">
          {recentlyViewedFunds?.map((fund) =>
            isMobile ? (
              <Row key={fund.code} fund={fund} activeLabelIdx={activeLabelIdx} />
            ) : (
              <CardLG
                key={fund.code}
                code={fund.code}
                logoCode={fund.short_code}
                shortName={fund.short_name + " Fund"}
                threeYearReturn={fund.return_3y}
              />
            ),
          )}
        </div>

        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}

export default RecentlyViewed;

function Row({ fund, activeLabelIdx }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/mutual-funds/${fund?.code}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const key = labelArr[activeLabelIdx].key;
  let value = fund[key] ? fund[key] + "%" : "NA";

  return (
    <div onClick={handleClick} className="flex min-w-full items-center border-b pb-4 sm:hidden">
      <FundLogo logoCode={fund.short_code} />

      <div className="ml-4">
        <span className="text-sm">{fund.short_name} Fund</span>
        <p className="text-muted-foreground flex items-center text-xs">
          {fund.fund_category}

       <FundRating rating={fund.fund_rating} />
        </p>
      </div>
      <div className="ml-auto">
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}
