import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters, setFilters } from "@/store/slices/mutualFundSlice";

const RATING_OPTIONS = [
  { label: "5", value: 5 },
  { label: "4+", value: 4 },
  { label: "3+", value: 3 },
  { label: "2+", value: 2 },
  { label: "1+ ", value: 1 },
];

function FilterRatingsTab() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handleRatingChange = (value) => {
    dispatch(setFilters({ ...filters, fund_rating_gte: value }));
  };

  return (
    <div className="h-full">
      <RadioGroup
        value={Number(filters.fund_rating_gte)}
        onValueChange={handleRatingChange}
        className="gap-0"
      >
        {RATING_OPTIONS.map((option) => (
          <Label
            key={option.value}
            className="sm:text-md flex cursor-pointer items-center gap-4 border-b px-2 py-4 font-[450] transition-colors sm:ml-2 sm:py-6"
          >
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
            />
            <div className="flex items-center gap-1">
              <span className="whitespace-pre">{option.label}</span>
              <StarIcon className="fill-foreground size-3" />
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterRatingsTab;
