import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router";
import FundLogo from "../FundLogo";

function DesktopTable({ portfolio }) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="border-b-transparent">
            <TableHead className="text-muted-foreground px-8 py-6">Fund name</TableHead>
            <TableHead className="text-base font-medium">Invested </TableHead>
            <TableHead className="text-base font-medium">Current Value</TableHead>
            <TableHead className="text-base font-medium text-wrap">Returns</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {portfolio?.map((item) => (
            <TableRow onClick={() => navigate(`/mutual-funds/${item.fundCode}`)} key={item.fundCode}>
              <TableCell className="flex items-center gap-8 py-4 pl-8">
                <FundLogo shortCode={item.shortCode} />
                <div>
                  <h4 className="text-base text-wrap">{item.fundName}</h4>
                  <p className="text-muted-foreground mt-1 flex items-center text-xs font-medium">{item.fundType}</p>
                </div>
              </TableCell>

              <TableCell className="text-base font-medium">₹{item.investedAmt} </TableCell>

              <TableCell
                className={`${item.marketValue >= item.investedAmt ? "text-green-500" : "text-red-500"} text-base`}
              >
                ₹{item.marketValue}
              </TableCell>

              <TableCell className="text-base">
                <div className={`${item.pnl >= 0 ? "text-green-500" : "text-red-500"} space-x-4 text-start`}>
                  <p>₹{item.pnl}</p>
                  <p className={`${item.roi >= 0 ? "text-green-500" : "text-red-500"} text-sm font-light`}>
                    ({item.roi}%)
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

export default DesktopTable;
