import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import FundLogo from "./FundLogo";
import { StarIcon } from "lucide-react";

function CardSM({ fund }) {
  return (
    <Link to={`/mutual-funds/${fund.unique_fund_code}`} className="w-full">
      <Card tabIndex={0} className="h- min-w-72 text-inherit">
        <CardHeader>
          <FundLogo logoCode={fund.short_code} className="size-8.5" />
        </CardHeader>

        <CardTitle className="flex justify-between gap-2 text-sm font-[500]">
          <p className="line-clamp-1">{fund.short_name}</p>
          <p className="text-[0.78rem] font-[500]">{fund.three_year_return.toFixed(2)}%</p>
        </CardTitle>

        <CardDescription className="mt-0.5 flex items-center justify-between pr-2 text-xs">
          <p className="flex text-xs">
            {fund.category} {fund.sub_category}
            {fund.rating && (
              <span className="ml-1 flex items-center">
                • {fund.rating} <StarIcon className="fill-muted-foreground text-muted-foreground ml-1 size-3" />
              </span>
            )}
          </p>
          <p>3Y</p>
        </CardDescription>
      </Card>
    </Link>
  );
}
export default CardSM;
