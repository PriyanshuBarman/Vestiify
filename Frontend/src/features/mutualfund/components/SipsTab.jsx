import { format } from "date-fns";
import { ChevronsLeftRightIcon } from "lucide-react";
import { useGetSips } from "../hooks/queries/internalQueries";
import { formatToINR } from "../utils/formaters";
import FundLogo from "./FundLogo";

function SipsTab() {
  const { data } = useGetSips();

  return (
    <div>
      {/* Title / Heading */}
      <div className="flex justify-between px-4">
        <h2 className="text-md font-medium">
          Active SIPs ({data?.sips?.length})
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <ChevronsLeftRightIcon className="size-4" />{" "}
          <span>Sort by: Due date</span>
        </div>
      </div>

      {data?.sips.map((sip) => (
        <div className="flex items-center justify-between border-b px-4 py-4">
          <FundLogo fundHouseDomain={sip.fundHouseDomain} className="size-10" />

          <div className="ml-4 flex-1">
            <h4 className="Fund-Name text-sm text-wrap">{sip.shortName}</h4>
            <p className="text-muted-foreground mt-2 text-sm font-semibold">
              {formatToINR(sip.amount)}
            </p>
          </div>

          <div className="Date rounded-xl border px-3 py-2 text-center">
            {/* <h2 className="font-medium">{getDate(sip.nextInstallmentDate)}</h2> */}
            <h2>23</h2>
            <span className="text-muted-foreground text-sm">
              {format(sip.nextInstallmentDate, "MMM")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SipsTab;
