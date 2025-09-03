import { formatToINR } from "@/features/mutualfund/utils/formaters";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import UpiPinKeypad from "./UpiPinKeypad";
import { toast } from "sonner";

function Upi({ amount, sendingTo, onSubmit, isPending, isError }) {
  const [pin, setPin] = useState("");

  const confirmPayment = () => {
    if (pin.length !== 4) {
      return toast.error("Enter Full Pin", {
        className:
          "!bg-white !border-none !text-black dark:!bg-white dark:!text-black",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    }
    onSubmit(pin);
  };

  useEffect(() => {
    if (isError) setPin("");
  }, [isError]);

  return (
    <div className="flex h-dvh flex-col bg-white text-black">
      <div className="text-md flex items-center justify-between px-4 font-medium">
        <h5 className="flex flex-col">
          Vestiify Wallet
          {/* <span>{formatToINR(10000)}</span> */}
        </h5>
        <img src="/upi-logo.svg" alt="upi-logo" className="h-14 w-20" />
      </div>
      <div className="text-md bg-gray-100 px-4 py-2">
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
      </div>

      <div className="mt-8 flex flex-col items-center gap-10">
        <h5 className="text-md font-medium">Enter Vestiify PIN</h5>
        <div className="Wrapper flex gap-4">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="Box relative flex h-4 w-14 items-end justify-center"
            >
              <div
                className={`Fake-Dash rounded-full text-center ${pin.charAt(idx) ? "size-3 bg-black" : "h-0.5 w-full bg-black/25"} ${pin.length === idx && "!bg-black"} `}
              >
                <span className="sr-only">{pin.charAt(idx) || ""}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <UpiPinKeypad
        isPending={isPending}
        pin={pin}
        setPin={setPin}
        onSubmit={confirmPayment}
        className="mt-auto"
      />
    </div>
  );
}
export default Upi;
