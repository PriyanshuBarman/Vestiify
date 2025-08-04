import { Link } from "react-router";
import SectionHeading from "./SectionHeading";

const COLLECTIONS = ["High Returns", "Gold Funds", "5 Star Funds", "Large Cap", "Mid Cap", "Small Cap"];

function Collections() {
  return (
    <section>
      <SectionHeading heading={"Collections"} />

      <div className="flex flex-wrap justify-between gap-y-4 px-4 sm:px-0">
        {COLLECTIONS.map((collection) => (
          <Link key={collection} to={`/mutual-funds/collections/${collection}`}>
            <div className="flex flex-col items-center justify-between">
              <div className="Collection-Card sm:shadow sm:bg-accent flex h-18 w-24 items-center justify-center rounded-xl sm:h-20 sm:w-30">
                <img
                  src={`${collection}.svg`}
                  alt={`${collection} logo`}
                  loading="lazy"
                  className="size-[70%] dark:mix-blend-hard-light"
                />
              </div>
              <p className="text-foreground-secondary mt-1 text-xs sm:mt-3 sm:text-sm sm:font-medium">{collection}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;
