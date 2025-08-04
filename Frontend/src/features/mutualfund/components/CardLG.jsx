import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import FundLogo from "./FundLogo";

function CardLG({ fund }) {
  return (
    <Link to={`/mutual-funds/${fund.scheme_code}`}>
      <Card className="h-42 w-47 cursor-pointer justify-between gap-2 p-4 text-inherit transition-normal duration-300 hover:scale-101">
        <FundLogo logoCode={fund.short_code} />
        <CardTitle className="text-sm font-medium sm:font-semibold">
          {fund.short_name}
        </CardTitle>

        <CardFooter className="content-center space-x-2 p-0 font-semibold">
          <span className="text-md">
            {fund.return_3y ? fund.return_3y.toFixed(1) + "%" : "NA"}
          </span>
          <span className="text-muted-foreground text-sm">(3Y)</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default CardLG;
