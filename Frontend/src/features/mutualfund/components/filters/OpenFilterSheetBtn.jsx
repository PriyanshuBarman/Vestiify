import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { selectFilters } from "@/store/slices/mutualFundSlice";
import { SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getActiveFilterCount } from "../../utils/filterUtils";
import FilterSheet from "./FilterSheet";

const OpenFilterSheetBtn = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const filters = useSelector(selectFilters);
  const activeFilterCount = getActiveFilterCount(filters);

  return (
    <Sheet open={open} modal={!isMobile} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative size-8 rounded-full sm:size-10"
          aria-label="Open filters"
          onClick={() => {
            setOpen(true);
          }}
        >
          <SlidersHorizontalIcon className="size-3.5 sm:size-4" />
          {activeFilterCount > 0 && (
            <Badge className="bg-foreground text-primary-foreground absolute -top-2 -right-2 flex h-5 min-w-5 rounded-full p-0 font-mono">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className={`[&>button]:hidden ${isMobile ? "h-svh pt-4 data-[state=open]:duration-300" : "min-w-xl pt-6 pr-4"}`}
      >
        <SheetTitle className="sr-only">Filter Sheet</SheetTitle>
        <FilterSheet onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default OpenFilterSheetBtn;
