import GoBackBtn from "@/components/GoBackBtn";
import { Button } from "@/components/ui/button";
import { TZDate } from "@date-fns/tz";
import { getDate } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import DatePicker from "../components/DatePicker";
import { useStartSip } from "../hooks/mutations/mutations";
import { useGetFundData } from "../hooks/queries/externalQueries";

function SipPaymentPage() {
  const { scheme_code } = useParams();
  const { data: fund = {} } = useGetFundData(scheme_code);
  const [amount, setAmount] = useState(0);
  const [sipDate, setSipDate] = useState(getDate(TZDate.tz("Asia/Kolkata")));
  const { mutate: startSip, isPending } = useStartSip();

  const handleNumberClick = (num) => {
    setAmount((prev) => prev * 10 + num);
  };

  const handleBackspace = () => setAmount((prev) => Math.floor(prev / 10));

  const handleAddExtra = (addAmount) =>
    setAmount((prev) => (parseInt(prev) + addAmount).toString());

  const handleInvest = () => {
    if (!amount) return toast.error("Please enter amount");
    if (amount < fund.sip_min) return;
    startSip({ amount, sipDate, fund });
  };

  return (
    <div className="flex h-lvh flex-col justify-between">
      {/* ================= Title ================= */}
      <div className="Title mt-4 flex items-center gap-4 px-4">
        <GoBackBtn />
        <div>
          <h5 className="font-medium">SIP</h5>
          <p className="text-xs">{fund.name}</p>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="mt-8 mb-auto flex flex-col items-center gap-y-14 px-4">
        {/* Installment Amount */}
        <div className="relative text-center">
          <p className="text-muted-foreground text-sm">Installment amount</p>
          <h1 className="mt-2 text-4xl">
            ₹ {amount?.toLocaleString()}
            <span className="text-muted-foreground animate-[blink_1s_step-start_infinite] text-5xl font-thin ease-in-out">
              |
            </span>
          </h1>
          {amount !== 0 && amount < fund.sip_min && (
            <p className="absolute mt-2 w-full text-center text-xs font-medium text-red-400">
              Min. ₹{fund.sip_min}{" "}
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
        <DatePicker sipDate={sipDate} setSipDate={setSipDate} />
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
            {isPending ? <Loader2Icon className="animate-spin" /> : "Start SIP"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SipPaymentPage;
