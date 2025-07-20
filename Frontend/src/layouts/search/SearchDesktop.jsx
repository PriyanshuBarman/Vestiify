import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { trendingStocks } from "@/constants/search";
import { useCtrlKSearchToggle } from "@/hooks/useCtrlKSearchToggle";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchResults } from "@/hooks/useSearchResults";
import {
  addToSearchHistory,
  setIsSearchOpen,
} from "@/store/slices/searchSlice";
import { Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FilterTabs from "./FilterTabs";
import LoadingSkeleton from "./LoadingSkeleton";
import SearchHistory from "./SearchHistory";
import SearchResult from "./SearchResult";
import TrendingSearches from "./TrendingSearches";

const SearchDesktop = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [displayQuery, setDisplayQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("mutual_funds");
  const [activeIdx, setActiveIdx] = useState(-1);
  const { searchHistory, isSearchOpen } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const searchBarRef = useRef();
  useCtrlKSearchToggle();

  const debouncedValue = useDebounce(query.trim());
  const { data, isLoading } = useSearchResults(debouncedValue);
  const searchResult = data?.[searchCategory] || null;

  // Open / Close Search Based on isSearchOpen state
  useEffect(() => {
    if (isSearchOpen) {
      searchBarRef.current.focus();
    } else {
      setQuery("");
      setDisplayQuery("");
      setActiveIdx(-1);
      searchBarRef.current.blur();
    }
  }, [isSearchOpen]);

  // it's representing items displayed in searchp-opover
  // Purpose*: for keyboard navigation selection (Arrow Up/Down, Enter)
  let list;
  if (searchResult) {
    list = searchResult;
  } else if (searchHistory.length) {
    list = searchHistory.filter((i) => i.asset_class_name === searchCategory);
  } else {
    list = trendingStocks;
  }

  const handleKeyDown = (e) => {
    if (e.key == "ArrowDown") {
      setActiveIdx(activeIdx === list?.length - 1 ? 0 : activeIdx + 1);
    } else if (e.key === "ArrowUp") {
      setActiveIdx(activeIdx === 0 ? list?.length - 1 : activeIdx - 1);
    } else if (e.key === "Escape") {
      dispatch(setIsSearchOpen(false));
    } else if (e.key === "Enter") {
      if (activeIdx < 0 || !list) return;
      navigate(`/mutual-funds/${list[activeIdx].unique_fund_code}`);
      dispatch(addToSearchHistory(list[activeIdx]));
      dispatch(setIsSearchOpen(false));
    }
  };

  const handleResultClick = useCallback(
    (clickIdx) => {
      navigate(`/mutual-funds/${list[clickIdx].unique_fund_code}`);
      dispatch(addToSearchHistory(list[clickIdx]));
      dispatch(setIsSearchOpen(false));
    },
    [list, navigate, dispatch],
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    setDisplayQuery(e.target.value);
    setActiveIdx(-1);
  };

  // Purpose : to setDisplayQuery & show the selected item in the searchbar
  useEffect(() => {
    if (activeIdx >= 0 && list) setDisplayQuery(list[activeIdx]?.name);
  }, [activeIdx]);

  return (
    <>
      <div onKeyDown={handleKeyDown} className="relative z-20 w-xl">
        {/* ============================ SearchBar ============================ */}
        <div className="SearchBar text-muted-foreground relative flex w-full items-center">
          <SearchIcon size={20} className="absolute left-4" />
          <input
            ref={searchBarRef}
            type="text"
            value={displayQuery}
            onChange={handleChange}
            onFocus={() => dispatch(setIsSearchOpen(true))}
            // onKeyDown={handleKeyDown}
            placeholder="Search "
            className={`!bg-background text-foreground min-w-full rounded-lg border px-12 py-2 outline-none ${isSearchOpen && "rounded-b-none border"}`}
          />
          <button
            disabled={isLoading}
            className={`Clear-Btn absolute right-4 ${!displayQuery?.length && "hidden"}`}
            onClick={() => {
              setQuery("");
              setDisplayQuery("");
              searchBarRef.current.focus();
            }}
          >
            {isLoading ? (
              <Loader2Icon className="text-primary animate-spin" />
            ) : (
              <XIcon size={18} />
            )}
          </button>

          <p
            className={`${displayQuery?.length && "hidden"} absolute right-6 text-xs`}
          >
            Ctrl+K
          </p>
        </div>

        {/* ============================// SearchBar ============================ */}

        {isSearchOpen && (
          <div className="Search-Popover bg-background absolute z-10 w-full space-y-6 rounded-b-lg border border-t-0 px-6 py-6">
            <FilterTabs {...{ searchCategory, setSearchCategory }} />

            <ScrollArea className="h-[60vh]">
              <LoadingSkeleton isLoading={isLoading} />

              {searchResult && !isLoading && (
                <SearchResult
                  {...{
                    searchResult,
                    handleResultClick,
                    activeIdx,
                    searchCategory,
                  }}
                />
              )}
              {!searchResult && !isLoading && (
                <SearchHistory
                  {...{ handleResultClick, activeIdx, searchCategory }}
                />
              )}
              {!searchResult?.length && !searchHistory.length && !isLoading && (
                <TrendingSearches activeIdx={activeIdx} />
              )}

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Backdrop Overlay */}
      {isSearchOpen && (
        <div
          onClick={() => dispatch(setIsSearchOpen(false))}
          className="Backdrop-Overlay fixed inset-0 z-10 bg-black/10 backdrop-blur-xs"
        ></div>
      )}
    </>
  );
};

export default SearchDesktop;
