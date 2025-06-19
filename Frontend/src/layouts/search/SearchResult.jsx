import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { memo } from "react";
import CompanyLogo from "./CompanyLogo";

function SearchResult({ searchResult, handleResultClick, activeIdx, searchCategory }) {
  return (
    <ul className="Search-Results">
      {searchResult?.map((item, idx) => (
        <li
          key={item.kuvera_id}
          onClick={() => handleResultClick(idx)}
          className={`${activeIdx === idx && "bg-input/50"} hover:bg-input flex cursor-pointer items-center gap-4 rounded-md px-4 py-3`}
        >
          <CompanyLogo searchCategory={searchCategory} item={item} />

          {/* Fund-Name & Category-Name */}
          <div className="flex w-full items-center justify-between">
            <div className="text-muted-foreground gap-3">
              <p className="Fund-Name max-w-[30ch] truncate">{item.name}</p>
              <span className="Category text-xs">
                {item.asset_class_name === "indian_stocks" ? item.subcategory : item.sub_category}
              </span>
            </div>

            {/*  Return */}
            <div className="Returns flex text-xs">
              1Y
              <span className={`ml-1 flex gap-1 ${item.one_year_return < 0 ? "text-red-400" : "text-primary"} `}>
                {Math.floor(parseFloat(item.one_year_return) * 10) / 10}%
                {item.one_year_return < 0 ? (
                  <TrendingDownIcon size={16} className="text-inherit" />
                ) : (
                  <TrendingUpIcon size={16} className="text-inherit" />
                )}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(SearchResult);
