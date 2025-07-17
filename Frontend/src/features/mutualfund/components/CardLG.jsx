import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import FundLogo from "./FundLogo";

function CardLG({ code, logoCode, shortName, threeYearReturn }) {
  return (
    <Link to={`/mutual-funds/${code}`}>
      <Card className="h-42 w-47 cursor-pointer justify-between text-inherit transition-normal duration-300 hover:scale-101">
        <CardHeader>
          <FundLogo logoCode={logoCode} />
        </CardHeader>

        <CardTitle className="text-sm font-semibold">{shortName}</CardTitle>

        <CardDescription className="content-center space-x-4 font-medium sm:font-semibold">
          <span className="text-foreground text-base">{threeYearReturn ? threeYearReturn.toFixed(1) + "%" : "NA"}</span>
          <span className="text-sm">3Y</span>
        </CardDescription>
      </Card>
    </Link>
  );
}
export default CardLG;
