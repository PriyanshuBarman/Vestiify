import { TrendingUpIcon } from "lucide-react";
import { trendingStocks } from "@/constants/search";

function TrendingSearches({ activeIdx }) {
  return (
    <>
      <h2 className="ml-2 font-medium">Trending Searches</h2>
      <ul className="mt-2">
        {trendingStocks.map((item, idx) => (
          <li
            key={idx}
            className={`${activeIdx === idx && "bg-input"} hover:bg-input flex cursor-pointer place-items-center gap-4 rounded-md px-4 py-4`}
          >
            <TrendingUpIcon size={16} className="text-muted-foreground" />
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TrendingSearches;
