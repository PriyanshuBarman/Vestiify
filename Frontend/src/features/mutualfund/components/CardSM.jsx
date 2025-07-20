import FundRating from "@/components/FundRating";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import FundLogo from "./FundLogo";

function CardSM({ fund }) {
  const { scheme_code, short_code, short_name, return_3y, category, fund_category, fund_rating } = fund; // prettier-ignore

  return (
    <Link to={`/mutual-funds/${scheme_code}`} className="w-full">
      <Card className="h- min-w-72 text-inherit">
        <CardHeader>
          <FundLogo logoCode={short_code} className="size-8.5" />
        </CardHeader>

        <CardTitle className="flex justify-between gap-2 text-sm font-[500]">
          <p className="line-clamp-1">{short_name}</p>
          <p className="text-[0.78rem] font-[500]">{return_3y}%</p>
        </CardTitle>

        <CardDescription className="mt-0.5 flex items-center justify-between pr-2 text-xs">
          <p className="flex text-xs">
            {category} {fund_category}
            <FundRating rating={fund_rating} />
          </p>
          <p>3Y</p>
        </CardDescription>
      </Card>
    </Link>
  );
}
export default CardSM;
