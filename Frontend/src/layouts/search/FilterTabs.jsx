import { Button } from "@/components/ui/button";
import { clearSearchHistory } from "@/store/slices/searchSlice";
import { Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const filterTabs = { All: "all", Stocks: "indian_stocks", "Mutual Funds": "mutual_funds", ETF: "etfs" };

function FilterTabs({ setSearchCategory, searchCategory }) {
  const searchHistory = useSelector((state) => state.search.searchHistory);
  const dispatch = useDispatch();

  return (
    <div className="Filter-Btns bg-background sticky top-0 z-10 flex w-full gap-3 px-4 sm:px-2">
      {Object.keys(filterTabs).map((label) => (
        <Button
          size="sm"
          key={label}
          variant="outline"
          onClick={() => setSearchCategory(filterTabs[label])}
          className={`text-foreground-secondary h-auto rounded-full py-1 text-[0.7rem] ${
            filterTabs[label] === searchCategory && "!border-foreground text-foreground !bg-foreground/5"
          }`}
        >
          {label}
        </Button>
      ))}

      <Button
        onClick={() => dispatch(clearSearchHistory())}
        variant="ghost"
        size="icon"
        className={`ml-auto h-auto ${!searchHistory.length && "hidden"}`}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}

export default FilterTabs;
