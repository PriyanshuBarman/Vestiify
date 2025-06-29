import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FundLogo from "@/features/mutualfund/components/FundLogo";
import { ChartCandlestickIcon } from "lucide-react";

function CompanyLogo({ searchCategory, item }) {
  return (
    <>
      {searchCategory === "indian_stocks" && (
        <Avatar className="size-10">
          <AvatarImage
            src={`https://img.logo.dev/ticker/${item.symbol}.NS?token=pk_Rlq_iuMcQHGZ2xOrcVGX7g&retina=true&fallback=404`}
          />
          <AvatarFallback className="bg-foreground/10"></AvatarFallback>
        </Avatar>
      )}

      {searchCategory === "mutual_funds" && (
        <FundLogo logoCode={item.short_code} className="size-9 rounded-full sm:size-10" />
      )}

      {searchCategory === "etfs" && (
        <ChartCandlestickIcon
          strokeWidth={1.5}
          className="bg-foreground/5 text-muted-foreground size-10 rounded-full p-3 sm:p-2.5"
        />
      )}
    </>
  );
}

export default CompanyLogo;
