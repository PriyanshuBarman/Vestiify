import GoBackBtn from "@/components/GoBackBtn";
import { trendingStocks } from "@/constants/search";
import { useDebounce } from "@/hooks/useDebounce";
import { useKeyboardDismiss } from "@/hooks/useKeyboardDismis";
import { useSearchResults } from "@/hooks/useSearchResults";
import { addToSearchHistory } from "@/store/slices/searchSlice";
import { BookmarkIcon, HistoryIcon, Loader2Icon, TrendingUp, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CompanyLogo from "./CompanyLogo";
import FilterTabs from "./FilterTabs";

function SearchPageMobile() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("mutual_funds");
  const debouncedValue = useDebounce(query.trim());

  const searchHistory = useSelector((state) => state.search.searchHistory);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  useKeyboardDismiss(inputRef);

  const { data, isLoading } = useSearchResults(debouncedValue);
  const searchResult = data && data[searchCategory] ? data[searchCategory] : [];

  const handleSubmit = (item) => {
    navigate(`/mutual-funds/${item.unique_fund_code}`, { replace: true });
    setQuery("");
    dispatch(addToSearchHistory(item));
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <div className="bg-background fixed inset-0 h-dvh overflow-y-auto">
      <div className="sticky top-0 space-y-4 ">
        {/* ============================ SearchBar ============================ */}
        <div className="SearchBar bg-background flex gap-4 border-b px-4 pt-6 pb-2">
          <GoBackBtn />
          <input
            ref={inputRef}
            type="search"
            className="w-full outline-none"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            className={`Clear_Btn size-auto ${!query.length && "hidden"}`}
            disabled={isLoading}
            onClick={() => {
              inputRef.current.focus();
              setQuery("");
            }}
          >
            {isLoading ? <Loader2Icon className="text-primary animate-spin" /> : <X size={20} />}
          </button>
        </div>
        {/* ============================// SearchBar ============================ */}

        <FilterTabs {...{ searchCategory, setSearchCategory }} />
      </div>
      {/* ============================// Filter-Btns ============================ */}

      <div className="Lists pb-50">
        {/* ================================== Search Results ================================== */}
        {searchResult?.length > 0 && (
          <div className="Search-Results mt-8 space-y-6">
            {searchResult.map((item) => (
              <div
                key={item.kuvera_id}
                onClick={() => handleSubmit(item)}
                className="flex cursor-pointer items-center gap-4 px-5 text-sm"
              >
                <CompanyLogo searchCategory={searchCategory} item={item} />
                <div>
                  <p className="Fund-Name line-clamp-2 text-wrap">{item.short_name}</p>
                  <span className="text-muted-foreground text-xs whitespace-pre">
                    {item.asset_class_name === "indian_stocks" ? item.subcategory : item.sub_category}
                  </span>
                </div>

                <BookmarkIcon className="text-muted-foreground ml-auto size-5" />

                {/* <p className="Return ml-auto flex text-xs">
                  1Y
                  <span className={`ml-1 flex gap-0.5 ${item.one_year_return < 0 ? "text-red-400" : "text-primary"} `}>
                    {Math.floor(item.one_year_return * 10) / 10}%
                    {item.one_year_return < 0 ? (
                      <TrendingDownIcon size={15} className="text-inherit" />
                    ) : (
                      <TrendingUpIcon size={15} className="text-inherit" />
                    )}
                  </span>
                </p> */}
              </div>
            ))}
          </div>
        )}
        {/* ==================================// Search Results ================================== */}

        {/* ============================ Search History & Trending Searches ============================ */}
        {query.length < 1 && (
          <>
            <ul className="Search-History my-4 space-y-8 px-5 text-sm">
              {searchHistory.map((item) => (
                <li onClick={() => handleSubmit(item)} key={item.unique_fund_code} className="flex gap-2">
                  <HistoryIcon size={18} className="text-muted-foreground" />
                  {item.short_name}
                </li>
              ))}
            </ul>

            <div className="Trending-Searches mt-8 px-4">
              <h6 className="text-sm">Trending searches</h6>
              <br />
              <div className="flex flex-wrap justify-between gap-4">
                {trendingStocks.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-12 w-[47%] items-center justify-start gap-2 rounded-sm border px-4 text-xs"
                  >
                    <TrendingUp size={14} className="text-muted-foreground shrink-0" />
                    <p className="truncate">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* ============================// Search History & Trending Searches ============================ */}
      </div>
    </div>
  );
}

export default SearchPageMobile;
