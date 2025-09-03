import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SipDayPicker({ selectedDay, onSelectDay }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 place-items-center gap-2">
      {days.map((day) => (
        <Button
          key={day}
          variant="ghost"
          disabled={day > 28}
          className={cn(
            "h-9 w-9 rounded-full p-0 font-normal",
            selectedDay === day &&
              "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
          onClick={() => onSelectDay(day)}
        >
          {day}
        </Button>
      ))}
    </div>
  );
}

export default SipDayPicker;
