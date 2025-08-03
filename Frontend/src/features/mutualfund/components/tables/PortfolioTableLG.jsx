import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
import FundLogo from "../FundLogo";
import { formatToINR } from "../../utils/formaters";

function PortfolioTableLG({ portfolio }) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="border-b-transparent">
            <TableHead className="text-muted-foreground px-8 py-6">
              Fund name
            </TableHead>
            <TableHead className="text-base font-medium">Invested </TableHead>
            <TableHead className="text-base font-medium">
              Current Value
            </TableHead>
            <TableHead className="text-base font-medium text-wrap">
              Returns
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {portfolio?.map((item) => (
            <TableRow
              onClick={() => navigate(`/mutual-funds/${item.schemeCode}`)}
              key={item.schemeCode}
            >
              <TableCell className="flex items-center gap-8 py-4 pl-8">
                <FundLogo logoCode={item.logoCode} />
                <div>
                  <h4 className="text-base text-wrap">{item.fundName}</h4>
                  <p className="text-muted-foreground mt-1 flex items-center text-xs font-medium">
                    {item.fundType}
                  </p>
                </div>
              </TableCell>

              <TableCell className="text-base font-medium">
                {formatToINR(item.invested)}
              </TableCell>

              <TableCell
                className={`${item.current >= item.invested ? "text-primary" : "text-red-500"} text-base`}
              >
                {formatToINR(item.current)}
              </TableCell>

              <TableCell className="text-base">
                <div
                  className={`${item.pnl >= 0 ? "text-primary" : "text-red-500"} space-x-4 text-start`}
                >
                  <p>{formatToINR(item.pnl)}</p>
                  <p
                    className={`${item.returnPercent >= 0 ? "text-primary" : "text-red-500"} text-sm font-light`}
                  >
                    ({item.returnPercent}%)
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PortfolioTableLG;
