import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowUpDownIcon, ChartNoAxesColumnDecreasingIcon, ChartNoAxesColumnIncreasing } from "lucide-react";
import { useState } from "react";

const sortOptions = [
  { label: "Fund Name", value: "fundName" },
  { label: "Current Value", value: "current" },
  { label: "Invested Amount", value: "invested" },
  { label: "P&L", value: "pnl" },
  { label: "Return Percent", value: "returnPercent" },
];

function FilterBtn({ sortBy, setSortBy, order, setOrder }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSortChange = (value) => {
    setSortBy(value);
    setIsDrawerOpen(false);
  };

  const toggleSortOrder = () => {
    const newOrder = order === "desc" ? "asc" : "desc";
    setOrder(newOrder);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <div className="text-foreground-secondary flex cursor-pointer items-center gap-2 pl-2 text-[0.8rem] font-medium transition-colors sm:text-base">
          <span className="border-muted-foreground border-b-2 border-dotted">Filter/Sort</span>
          {order === "desc" ? (
            <ChartNoAxesColumnDecreasingIcon size={18} className="rotate-90" />
          ) : (
            <ChartNoAxesColumnIncreasing size={18} className="rotate-90" />
          )}
        </div>
      </DrawerTrigger>

      <DrawerContent className="text-foreground-secondary px-4 pb-8 sm:px-20">
        <div className="my-6 flex items-center justify-between rounded-lg sm:px-4">
          <DialogTitle className="text-base sm:text-xl">Sort by</DialogTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortOrder}
            className="flex items-center gap-2 text-xs sm:text-lg"
          >
            <ArrowUpDownIcon className="size-4 sm:size-5" />
            {order === "desc" ? "High to Low" : "Low to High"}
          </Button>
        </div>

        <RadioGroup value={sortBy} onValueChange={handleSortChange}>
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className="hover:bg-muted flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors sm:p-4"
              onClick={() => handleSortChange(option.value)}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="data-[state=checked]:border-primary border-primary"
              />
              <Label htmlFor={option.value} className="font-medium sm:ml-2 sm:text-base">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </DrawerContent>
    </Drawer>
  );
}

export default FilterBtn;
