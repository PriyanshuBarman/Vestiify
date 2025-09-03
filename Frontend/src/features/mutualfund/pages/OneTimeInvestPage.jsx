import GoBackBtn from "@/components/GoBackBtn";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useMakeInvestment } from "../hooks/mutations/mutations";
import { useGetFundData } from "../hooks/queries/externalQueries";
import { Loader2Icon } from "lucide-react";

function OneTimeInvestPage() {
  const { scheme_code } = useParams();
  const { data: fund = {} } = useGetFundData(scheme_code);
  const [amount, setAmount] = useState(0);
  const { mutate: invest, isPending } = useMakeInvestment();

  const handleNumberClick = (num) => {
    setAmount((prev) => prev * 10 + num);
  };

  const handleBackspace = () => setAmount((prev) => Math.floor(prev / 10));

  const handleAddExtra = (addAmount) =>
    setAmount((prev) => (parseInt(prev) + addAmount).toString());

  const handleInvest = () => {
    if (!amount) return toast.error("Please enter amount");
    if (amount < fund.lump_min) return;
    invest({ amount, fund });
  };

  return (
    <div className="flex h-lvh flex-col justify-between">
      {/* ================= Title ================= */}
      <div className="Title mt-4 flex items-center gap-4 px-4">
        <GoBackBtn />
        <div>
          <h5 className="font-medium">One-Time</h5>
          <p className="text-xs">{fund.name}</p>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="mt-8 mb-auto space-y-14 px-4">
        {/* Investment Amount */}
        <div className="relative text-center">
          <p className="text-muted-foreground text-sm">Investment amount</p>
          <h1 className="mt-2 text-4xl">
            ₹ {amount?.toLocaleString()}
            <span className="text-muted-foreground animate-[blink_1s_step-start_infinite] text-5xl font-thin ease-in-out">
              |
            </span>
          </h1>
          {amount !== 0 && amount < fund.lump_min && (
            <p className="absolute mt-2 w-full text-center text-xs font-medium text-red-400">
              Min. ₹{fund.lump_min}{" "}
            </p>
          )}
        </div>

        {/* Add Extra Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => handleAddExtra(500)}
          >
            + ₹500
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => handleAddExtra(1000)}
          >
            + ₹1,0000
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => handleAddExtra(5000)}
          >
            + ₹5,000
          </Button>
        </div>
      </div>

      {/*=============== Keypad & Bottom Buttons =============== */}
      <div>
        <div className="KeyPad grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="active:bg-input text-2xl font-normal"
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="ghost"
            onClick={() => setAmount(0)}
            className={"text-lg font-normal"}
          >
            AC
          </Button>
          <Button
            variant="ghost"
            onClick={handleBackspace}
            className="text-2xl"
          >
            ⌫
          </Button>
        </div>

        {/*======== Add-To-Cart & Invest Buttons ======== */}
        <div className="mt-6 flex justify-evenly p-4">
          <Button
            disabled={isPending}
            size="lg"
            onClick={handleInvest}
            className="w-full text-white"
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Invest"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OneTimeInvestPage;
