import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SipDayPicker from "./SipDayPicker";
import { CalendarCheck2Icon, ChevronDownIcon } from "lucide-react";
import { addMonths, format } from "date-fns";
import { tz, TZDate } from "@date-fns/tz";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

function DatePicker({ sipDate, setSipDate }) {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState(sipDate);
  const date = TZDate.tz("Asia/Kolkata");

  const selectedDateWithSuffix = format(
    new Date(date.getFullYear(), date.getMonth(), selectedDate),
    "do",
  );

  const sipDateWithSuffix = format(
    new Date(date.getFullYear(), date.getMonth(), sipDate),
    "do",
  );

  const nextInstallmentMonth = format(addMonths(date, 1), "LLLL");

  if (isMobile)
    return (
      <Drawer onOpenChange={() => setSelectedDate(sipDate)}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="rounded-full">
            <CalendarCheck2Icon /> Monthly on {sipDateWithSuffix}{" "}
            <ChevronDownIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm p-4">
            <h4 className="mb-4 text-center font-medium">
              Choose SIP installment date
            </h4>

            <SipDayPicker
              selectedDay={selectedDate}
              onSelectDay={setSelectedDate}
            />

            {sipDate < 29 && (
              <p className="text-muted-foreground mt-4 text-center text-sm">
                Next SIP installment on {selectedDateWithSuffix} of{" "}
                {nextInstallmentMonth}.
              </p>
            )}

            <DrawerClose className="w-full">
              <Button
                onClick={() => setSipDate(selectedDate)}
                disabled={sipDate === selectedDate || selectedDate > 28}
                className="disabled:bg-muted-foreground mt-4 w-full"
              >
                Update
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );

  // If Desktop
  return (
    <Dialog onOpenChange={() => setSelectedDate(sipDate)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CalendarCheck2Icon /> Monthly on {sipDateWithSuffix}{" "}
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="p-2">
          <h4 className="mb-4 text-center font-medium">
            Choose SIP installment date
          </h4>

          <SipDayPicker
            selectedDay={selectedDate}
            onSelectDay={setSelectedDate}
          />

          {selectedDate < 29 && (
            <p className="text-muted-foreground mt-4 text-center text-sm">
              Next SIP installment on {selectedDateWithSuffix} of{" "}
              {nextInstallmentMonth}.
            </p>
          )}

          <DialogClose className="w-full">
            <Button
              onClick={() => setSipDate(selectedDate)}
              disabled={sipDate === selectedDate || selectedDate > 28}
              className="disabled:bg-muted-foreground mt-4 w-full"
            >
              Update
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DatePicker;
