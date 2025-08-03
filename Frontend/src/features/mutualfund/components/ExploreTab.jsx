import AllFunds from "./AllFunds";
import Collections from "./Collections";
import IndexFunds from "./IndexFunds";
import PopularFunds from "./PopularFunds";
import QuickAccess from "./QuickAccess";
import StartSip from "./StartSip";
import YourInvestments from "./YourInvestments";

function ExploreTab() {
  return (
    <div className="flex sm:gap-6">
      <div className="flex w-full max-w-[800px] flex-col space-y-8 lg:w-[67%] lg:space-y-14">
        <StartSip />
        <PopularFunds />
        <Collections />
        <IndexFunds />
        <QuickAccess />
        <AllFunds />
      </div>
      <YourInvestments />
    </div>
  );
}

export default ExploreTab;
