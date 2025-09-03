import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, DeleteIcon, Loader2Icon } from "lucide-react";

function UpiPinKeypad({ pin, setPin, className, onSubmit, isPending }) {
  const handleNumberClick = (num) => {
    if (pin.length === 4) return;
    setPin((prev) => prev + num);
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div
      className={cn(
        "KeyPad grid grid-cols-3 place-items-center bg-neutral-100 py-2 text-blue-900",
        className,
      )}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className="active:bg-input p-8 text-3xl font-normal"
          onClick={() => handleNumberClick(num)}
        >
          {num}
        </Button>
      ))}

      <Button
        variant="ghost"
        onClick={handleBackspace}
        className="active:bg-input p-8 text-lg"
      >
        <DeleteIcon className="size-12 fill-blue-900 text-white" />
      </Button>
      <Button
        variant="ghost"
        className="active:bg-input p-8 text-3xl font-normal"
        onClick={() => handleNumberClick(0)}
      >
        0
      </Button>

      <Button disabled={isPending} variant="ghost" onClick={onSubmit}>
        <div className="flex size-14 items-center justify-center rounded-full bg-blue-900 text-3xl font-normal">
          {isPending ? (
            <Loader2Icon className="animate-spin text-white" />
          ) : (
            <CheckIcon className="size-9 text-white" />
          )}
        </div>
      </Button>
    </div>
  );
}

export default UpiPinKeypad;
