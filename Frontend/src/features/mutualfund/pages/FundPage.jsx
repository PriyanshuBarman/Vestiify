import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setIsSearchOpen } from "@/store/slices/searchSlice";
import { Bookmark, LockKeyholeIcon, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Accordians from "../components/Accordians";
import Chart from "../components/chart/Chart";
import FundDescription from "../components/FundDescription";
import FundLogo from "../components/FundLogo";
import InvestFormDesktop from "../components/InvestFormDesktop";
import PurchaseBtns from "../components/PurchaseBtns";
import RecentlyViewed from "../components/RecentlyViewed";
import { useGetFundData } from "../hooks/queries/externalQueries";
import GoBackBar from "@/components/GoBackBar";
import { formatFundCategory } from "../utils/formaters";

function FundPage() {
  const { scheme_code } = useParams();
  const { data: fund = {} } = useGetFundData(scheme_code);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearchClick = () => {
    isMobile ? navigate("/search") : dispatch(setIsSearchOpen(true));
  };

  return (
    <div className="sm:flex sm:gap-6">
      <GoBackBar />
      <div className="h-full w-full space-y-4 text-inherit sm:space-y-6 lg:w-[67%]">
        <div className="px-4">
          <div className="flex justify-between">
            <FundLogo
              logoCode={fund.short_code}
              className="border sm:size-13"
            />
            <div className="icons flex items-center gap-8">
              <Search onClick={handleSearchClick} />
              <Bookmark />
            </div>
          </div>

          <h2 className="Fund-name mt-4 min-h-[1.5rem] text-lg font-medium sm:text-2xl">
            {fund.name}
          </h2>

          {/* Fund Category, Risk Level Badges */}
          <div className="text-muted-foreground/90 sm:text-foreground flex items-center sm:mt-4 sm:space-x-2">
            <Badge variant="mutualFund" className="pl-0">
              {fund.fund_type}
            </Badge>
            <Badge variant="mutualFund">
              {formatFundCategory(fund.fund_category)}
            </Badge>
            <Badge variant="mutualFund">{fund.crisil_rating}</Badge>
            {fund.lock_in_period > 0 && (
              <Badge
                variant="mutualFund"
                className="text-primary border-primary"
              >
                <div>
                  <LockKeyholeIcon className="size-5" />
                </div>
                <span className="ml-1.5 text-sm leading-0">
                  {fund.lock_in_period}Y Lock in
                </span>
              </Badge>
            )}
          </div>
        </div>

        <Chart fund={fund} />
        <FundDescription fund={fund} />
        <Accordians fund={fund} />
        <RecentlyViewed />
        {isMobile && <PurchaseBtns fund={fund} />}
      </div>

      <InvestFormDesktop fund={fund} />
    </div>
  );
}

export default FundPage;
