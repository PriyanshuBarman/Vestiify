import { useGetFundPortfolio } from "../hooks/useGetFundPortfolio";
import { Card, CardContent } from "@/components/ui/card";
import { formatToINR } from "@/utils/formatters";

function FundPortfolioPreview({ schemeCode }) {
  const { data: fundPortfolio } = useGetFundPortfolio(schemeCode);

  if (!fundPortfolio) return null;

  return (
    <Card className="mx-4 mt-4 py-4">
      <CardContent className="flex justify-between text-center">
        <div>
          <h3 className={`text-sm tabular-nums sm:text-lg sm:font-medium`}>
            {formatToINR(fundPortfolio.invested || 0)}
          </h3>
          <h3 className="text-xs mt-2 sm:text-sm">Invested</h3>
        </div>

        <div>
          <h3
            className={`text-sm tabular-nums sm:text-lg sm:font-medium ${fundPortfolio.current < fundPortfolio.invested ? "text-negative" : "text-positive"}`}
          >
            {formatToINR(fundPortfolio.current || 0)}
          </h3>
          <h3 className="text-xs mt-2 sm:text-sm">Current Value</h3>
        </div>
      </CardContent>
    </Card>
  );
}

export default FundPortfolioPreview;
