import clsx from "clsx";
import { StarIcon } from "lucide-react";

function FundRating({ rating, className = "" }) {
  if (!rating) return;

  return (
    <span className={clsx("ml-2 flex items-center gap-1 whitespace-pre", className)}>
      {rating}
      <StarIcon className="fill-muted-foreground text-muted-foreground size-2.5" />
    </span>
  );
}

export default FundRating;
