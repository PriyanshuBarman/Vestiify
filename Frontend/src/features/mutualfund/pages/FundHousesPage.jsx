import GoBackBar from "@/components/GoBackBar";
import { Link } from "react-router";
import FundLogo from "../components/FundLogo";
import { useGetAMCs } from "../hooks/useGetAMCs";

function FundHousesPage() {
  const { data: amcs } = useGetAMCs();
  return (
    <div>
      <GoBackBar title="Fund houses" />

      <div className="flex flex-wrap justify-between gap-4 px-4 sm:m-0.5 sm:gap-3 sm:px-0">
        {amcs?.map((amc) => (
          <Link
            key={amc.amc_code}
            to={`/mutual-funds/amc-funds`}
            state={{
              amcCode: amc.amc_code,
              amcName: amc.amc_name,
              fundHouseDomain: amc.detail_info,
              aum: amc.aum,
              rank:
                amcs.findIndex((item) => item.amc_code === amc.amc_code) + 1,
            }}
            className="w-[47%] cursor-pointer space-y-2 rounded-2xl border p-3 duration-200 hover:scale-101 sm:m-0.5 sm:space-y-4 sm:p-4"
          >
            <div className="flex items-end gap-2 sm:gap-4">
              <FundLogo fundHouseDomain={amc.detail_info} className="size-10" />
              <p className="text-2xs sm:text-[0.9rem] sm:font-medium">
                {amc.fundCount}
                <span className="ml-0.5 text-[85%] sm:ml-1">Funds</span>
              </p>
            </div>
            <p className="line-clamp-1 text-xs font-[450] sm:text-sm sm:font-semibold">
              {amc.amc_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default FundHousesPage;
