import FundRating from "@/features/mutualfund/components/FundRating";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import FundLogo from "./FundLogo";

function CardSM({ fund }) {
  return (
    <Link to={`/mutual-funds/${fund.scheme_code}`} className="w-full">
      <Card className="h- min-w-72 text-inherit">
        <CardHeader>
          <FundLogo logoCode={fund.short_code} className="size-8.5" />
        </CardHeader>

        <CardTitle className="flex justify-between gap-2 text-sm font-[500]">
          <p className="line-clamp-1">{fund.short_name}</p>
          <p className="text-[0.78rem] font-[500]">{fund.return_3y}%</p>
        </CardTitle>

        <CardDescription className="mt-0.5 flex items-center justify-between pr-2 text-xs">
          <div className="flex gap-2 text-xs">
            <span>{fund.category}</span>
            <span>{fund.fund_category}</span>
            <FundRating rating={fund.fund_rating} />
          </div>
          <span>3Y</span>
        </CardDescription>
      </Card>
    </Link>
  );
}
export default CardSM;
