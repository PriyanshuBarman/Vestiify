import GoBackBtn from "@/components/GoBackBtn";
import { useDebounce } from "@/hooks/useDebounce";
import { useKeyboardDismiss } from "@/hooks/useKeyboardDismis";
import { useSearchResults } from "@/hooks/useSearchResults";
import { addToSearchHistory } from "@/store/slices/searchSlice";
import { Loader2Icon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FilterTabs from "./FilterTabs";
import SearchHistory from "./SearchHistory";
import SearchResult from "./SearchResult";
import TrendingSearches from "./TrendingSearches";

function MobileSearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("mutualFunds");
  const debouncedQuery = useDebounce(query.trim());

  const searchHistory = useSelector((state) => state.search.searchHistory);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  useKeyboardDismiss(inputRef);

  const { data: searchResult, isLoading } = useSearchResults(
    debouncedQuery,
    searchType,
  );

  const handleClick = (item) => {
    navigate(`/mutual-funds/${item.scheme_code}`, {
      replace: true,
    });
    setQuery("");
    dispatch(addToSearchHistory({ item, type: searchType }));
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <div className="bg-background h-dvh space-y-4 overflow-y-auto">
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
          className={`Clear-Btn size-auto ${!query.length && "hidden"}`}
          disabled={isLoading}
          onClick={() => {
            inputRef.current.focus();
            setQuery("");
          }}
        >
          {isLoading ? (
            <Loader2Icon className="text-primary animate-spin" />
          ) : (
            <X size={20} />
          )}
        </button>
      </div>
      {/* ============================// SearchBar ============================ */}

      <FilterTabs searchType={searchType} setSearchType={setSearchType} />

      <div className="Lists space-y-4 px-2">
        <SearchResult
          searchResult={searchResult}
          searchType={searchType}
          handleClick={handleClick}
        />
        {!searchResult && !isLoading && (
          <SearchHistory
            searchHistory={searchHistory}
            searchType={searchType}
            handleClick={handleClick}
          />
        )}

        {!searchResult && !searchHistory[searchType]?.length && !isLoading && (
          <TrendingSearches handleClick={handleClick} />
        )}
      </div>
    </div>
  );
}

export default MobileSearchPage;
