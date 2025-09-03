import GoBackBtn from "@/components/GoBackBtn";
import Keypad from "@/components/Keypad";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useGetFundData } from "../hooks/queries/externalQueries";
import { formatToINR } from "../utils/formaters";
import { TZDate } from "@date-fns/tz";
import { getDate } from "date-fns";
import DatePicker from "../components/DatePicker";

function InvestPage() {
  const navigate = useNavigate();
  const schemeCode = useLocation().state?.schemeCode;
  const { data: fund = {} } = useGetFundData(schemeCode);
  const [amount, setAmount] = useState(0);

  const { orderType } = useParams();
  const isSip = orderType === "sip";
  const [sipDate, setSipDate] = useState(
    isSip ? getDate(TZDate.tz("Asia/Kolkata")) : null,
  );

  const handleInvest = () => {
    if (!amount) return toast.error("Please enter amount");
    navigate(`/mutual-funds/upi`, {
      state: {
        amount,
        schemeCode: schemeCode,
        sipDate,
        orderType,
      },
    });
  };

  return (
    <div className="flex h-dvh flex-col justify-between">
      {/* ================= Title ================= */}
      <div className="Title mt-4 flex items-center gap-4 px-4">
        <GoBackBtn />
        <div>
          <h5 className="font-medium">{isSip ? "SIP" : "One-Time"}</h5>
          <p className="text-xs">{fund.name}</p>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="mt-8 mb-auto flex flex-col items-center gap-y-12 px-4">
        {/* Installment Amount */}
        <div className="relative text-center">
          <p className="text-muted-foreground text-sm">
            {isSip ? "Installment amount" : "Investment amount"}
          </p>
          <h1 className="mt-2 text-4xl">
            ₹ {amount?.toLocaleString()}
            <span className="text-muted-foreground animate-[blink_1s_step-start_infinite] text-5xl font-thin ease-in-out">
              |
            </span>
          </h1>
          {amount !== 0 && amount < (isSip ? fund.sip_min : fund.lump_min) && (
            <p className="mt-4 text-xs font-medium text-red-400">
              The minimum amount for {isSip ? "SIP" : "Lumpsum"} is{" "}
              {formatToINR(isSip ? fund.sip_min : fund.lump_min)}
            </p>
          )}
        </div>

        {/* Add Extra Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setAmount((prev) => (parseInt(prev) + 500).toString())
            }
          >
            + ₹500
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setAmount((prev) => (parseInt(prev) + 1000).toString())
            }
          >
            + ₹1,000
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setAmount((prev) => (parseInt(prev) + 5000).toString())
            }
          >
            + ₹5,000
          </Button>
        </div>
        {isSip && <DatePicker sipDate={sipDate} setSipDate={setSipDate} />}
      </div>

      {/*=============== Keypad & Start SIP Button =============== */}
      <div>
        <Keypad setAmount={setAmount} />

        {/*========  Start SIP Button ======== */}
        <div className="mt-6 flex justify-evenly p-4">
          <Button
            disabled={amount < (isSip ? fund.sip_min : fund.lump_min)}
            size="lg"
            onClick={handleInvest}
            className="w-full"
          >
            {isSip ? "Start SIP" : "Invest"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InvestPage;
