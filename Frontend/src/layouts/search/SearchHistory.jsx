import { HistoryIcon } from "lucide-react";
import { memo } from "react";
import { useSelector } from "react-redux";

function SearchHistory({ handleResultClick, activeIdx, searchCategory }) {
  const searchHistory = useSelector((state) => state.search.searchHistory);

  return (
    <ul className="History space-y-4">
      {searchHistory
        ?.filter((item) => searchCategory === "all" || item.asset_class_name === searchCategory)
        .map((item, idx) => (
          <li
            key={item.unique_fund_code}
            onClick={() => handleResultClick(idx)}
            className={`${activeIdx === idx && "bg-input"} hover:bg-input flex cursor-pointer place-items-center gap-4 rounded px-4 py-4`}
          >
            <HistoryIcon size={18} className="text-muted-foreground" />
            {item.name}
          </li>
        ))}
    </ul>
  );
}

export default memo(SearchHistory);
