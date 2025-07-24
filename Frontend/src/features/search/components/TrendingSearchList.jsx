import { useGetPopularFunds } from "@/features/mutualfund/hooks/queries/externalQueries";
import { TrendingUpIcon } from "lucide-react";

function TrendingSearchList({ activeIdx, handleClick }) {
  const { data: popularFunds } = useGetPopularFunds();

  return (
    <div className="mt-2 px-2">
      <h6 className="text-sm">Popular Funds</h6>

      <ul className="mt-4 flex flex-wrap justify-between gap-4 sm:gap-6">
        {popularFunds?.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item)}
            className={`${activeIdx === index && "bg-accent"} hover:bg-accent flex w-full items-center justify-start gap-2 rounded-md border px-4 py-2 text-xs sm:text-sm`}
          >
            <TrendingUpIcon
              size={16}
              className="text-muted-foreground shrink-0"
            />
            <p className="truncate">{item.short_name || item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingSearchList;
