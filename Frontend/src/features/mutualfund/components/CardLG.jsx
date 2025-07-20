import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import FundLogo from "./FundLogo";

function CardLG({ fund }) {
  const { scheme_code, short_code, short_name, return_3y } = fund;

  return (
    <Link to={`/mutual-funds/${scheme_code}`}>
      <Card className="h-42 w-47 cursor-pointer justify-between text-inherit transition-normal duration-300 hover:scale-101">
        <CardHeader>
          <FundLogo logoCode={short_code} />
        </CardHeader>

        <CardTitle className="text-sm font-semibold">{short_name}</CardTitle>

        <CardDescription className="content-center space-x-4 font-medium sm:font-semibold">
          <span className="text-foreground text-base">
            {return_3y ? return_3y.toFixed(1) + "%" : "NA"}
          </span>
          <span className="text-sm">3Y</span>
        </CardDescription>
      </Card>
    </Link>
  );
}
export default CardLG;
