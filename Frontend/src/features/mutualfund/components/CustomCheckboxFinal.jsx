import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomCheckbox = ({
  state, // "checked" | "indeterminate" | "unchecked"
  onChange,
  className,
  id,
  ...props
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange && onChange();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange && onChange();
    }
  };

  const isChecked = state === "checked";
  const isIndeterminate = state === "indeterminate";

  return (
    <div
      role="checkbox"
      aria-checked={isChecked ? "true" : isIndeterminate ? "mixed" : "false"}
      tabIndex={0}
      className={cn(
        "focus:ring-primary flex h-4 w-4 cursor-pointer items-center justify-center rounded border-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none",
        isChecked
          ? "border-primary bg-primary text-primary-foreground"
          : isIndeterminate
            ? "border-orange-500 bg-orange-50"
            : "border-muted-foreground",
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      id={id}
      {...props}
    >
      {isChecked && <Check className="h-3 w-3" />}
      {isIndeterminate && <Minus className="h-3 w-3 text-orange-600" />}
    </div>
  );
};

export default CustomCheckbox;
