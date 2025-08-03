import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowDownAZIcon,
  ArrowUpZAIcon,
  ChartNoAxesColumnDecreasingIcon,
  ChartNoAxesColumnIncreasing,
  ChevronDownIcon,
} from "lucide-react";
import { useState } from "react";

function SortByButton({
  order,
  onSortChange,
  sortOptions,
  activeSortBy,
  onOrderChange,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleSortChange = (value) => {
    onSortChange(value);
    setIsDrawerOpen(false);
  };

  const isDefaultSort = activeSortBy === Object.keys(sortOptions)[0];

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={`h-7.5 rounded-full text-[0.65rem] sm:h-10 sm:text-xs ${
            !isDefaultSort && "!border-foreground bg-accent"
          }`}
        >
          {order === "desc" ? (
            <ChartNoAxesColumnDecreasingIcon className="size-3.5 rotate-90" />
          ) : (
            <ChartNoAxesColumnIncreasing size={18} className="rotate-90" />
          )}

          {!isDefaultSort ? (
            <span>Sort: {sortOptions[activeSortBy]}</span>
          ) : (
            <span>Sort by</span>
          )}
          <ChevronDownIcon className="size-3.5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="text-foreground-secondary px-4 pb-2 sm:px-20">
        <div className="my-2 flex items-center justify-between rounded-lg sm:px-4">
          <DialogTitle className="text-base sm:text-xl">Sort by</DialogTitle>
          {onOrderChange && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={onOrderChange}
            >
              {order === "desc" ? (
                <ArrowUpZAIcon className="size-4" />
              ) : (
                <ArrowDownAZIcon className="size-4" />
              )}
            </Button>
          )}
        </div>

        <RadioGroup
          defaultValue={activeSortBy}
          onValueChange={handleSortChange}
          className="gap-0"
        >
          {Object.keys(sortOptions)
            .slice(0, showMore ? undefined : 6)
            .map((option) => (
              <Label
                key={option}
                className="flex cursor-pointer items-center gap-4 border-b px-2 py-4 font-[450] transition-colors sm:ml-2 sm:gap-6 sm:py-6 sm:text-base sm:font-medium"
              >
                <RadioGroupItem
                  value={option}
                  id={option}
                  className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2 [&_[data-slot=radio-group-indicator]_svg]:size-2.5"
                />
                <span>{sortOptions[option]}</span>
              </Label>
            ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMore(!showMore)}
            className="mt-2 w-full"
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>
        </RadioGroup>
      </DrawerContent>
    </Drawer>
  );
}

export default SortByButton;
