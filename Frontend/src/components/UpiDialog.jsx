import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatToINR } from "@/features/mutualfund/utils/formaters";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

function UpiDialog({
  children,
  amount,
  sendingTo,
  onSubmit,
  isError,
  isPending,
}) {
  const [pin, setPin] = useState("");

  const handleOnChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    setPin(value);

    if (value.length === 4) {
      onSubmit(value);
    }
  };

  useEffect(() => {
    if (isError) setPin("");
  }, [isError]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-8 overflow-hidden p-8">
        {isPending && (
          <div className="absolute inset-0 z-10 grid place-items-center">
            <Loader2Icon className="text-primary size-12 animate-spin" />
          </div>
        )}

        <DialogHeader className="gap-8">
          <DialogTitle className="text font-normal">
            Confirm Payment
          </DialogTitle>
          <DialogDescription className="bg-accent space-y-2 rounded-2xl px-6 py-2">
            <div className="flex justify-between">
              Sending:
              <span className="ml-2 font-medium tabular-nums">
                {formatToINR(amount, 2)}{" "}
              </span>
            </div>
            <div className="flex justify-between">
              To:
              <span className="flex items-center gap-2 text-sm font-medium">
                {sendingTo} <ChevronDownIcon className="size-2" />
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <h5>Enter Pin</h5>

          {/* Fake input UI */}
          <div className="relative flex items-center justify-center gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="Box relative flex h-4 w-14 items-end justify-center"
              >
                <div
                  className={`Fake-Dash rounded-full text-center ${pin.charAt(idx) ? "bg-foreground size-3" : "bg-foreground/25 h-0.5 w-full"} ${pin.length === idx && "!bg-foreground"} `}
                />
              </div>
            ))}
          </div>

          {/* Real but hidden input */}
          <input
            autoFocus
            type="tel"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={handleOnChange}
            className="absolute inset-0 opacity-0"
          />
        </div>

        <DialogFooter className="mt-8">
          <img src="/upi-logo.svg" alt="upi-logo" className="h-14 w-20" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpiDialog;
