import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBalance } from "@/hooks/queries/internalQueries";
import { getDate } from "date-fns";
import { IndianRupeeIcon } from "lucide-react";
import { useState } from "react";
import { TZDate } from "react-day-picker";
import { toast } from "sonner";
import { useMakeInvestment, useStartSip } from "../hooks/mutations/mutations";
import { formatToINR } from "../utils/formaters";
import DatePicker from "./DatePicker";

function DesktopPaymentCard({ fund }) {
  const [amount, setAmount] = useState("");
  const [sipDate, setSipDate] = useState(getDate(TZDate.tz("Asia/Kolkata")));
  const { mutate: invest, isPending } = useMakeInvestment();
  const { mutate: startSip } = useStartSip();
  const { data: balance } = useGetBalance();

  const handleInvest = (type) => {
    if (amount === "") {
      return toast.error("Please enter amount");
    }
    if (
      (type === "sip" && amount < fund?.sip_min) ||
      (type === "lumpsum" && amount < fund?.lump_min)
    ) {
      return;
    }

    if (type === "sip") {
      startSip({ amount, sipDate, fund });
    } else {
      invest({ amount, fund });
    }
  };

  return (
    <div className="bg-background fixed top-30 hidden h-[450px] w-[400px] rounded-xl border p-6 lg:right-[2%] lg:flex xl:right-30 xl:flex-col">
      <Tabs defaultValue="sip" className="flex h-full flex-col">
        <TabsList className="ring-muted-foreground/20 mb-4 w-full bg-transparent ring">
          <TabsTrigger
            value="sip"
            className="data-[state=active]:text-primary data-[state=active]:bg-primary/10"
          >
            MONTHLY SIP
          </TabsTrigger>
          <TabsTrigger
            value="lumpsum"
            className="data-[state=active]:text-primary data-[state=active]:bg-primary/10"
          >
            ONE-TIME
          </TabsTrigger>
        </TabsList>

        {/* =================== SIP Tab =================== */}

        <TabsContent value="sip" className="flex h-full flex-col">
          <div className="mt-4 flex-grow space-y-8 px-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium"> SIP Amount</h2>
              <div className="input-wrapper text-muted-foreground relative w-1/2">
                <IndianRupeeIcon className="absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  type="number"
                  placeholder="SIP Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="peer invest-input"
                  min={fund?.sip_min}
                  onKeyDown={(e) => e.key === "Enter" && handleInvest("sip")}
                />
                <p className="invest-input-error">
                  Min SIP amount is ₹{fund?.sip_min}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Monthly SIP Data</h2>
              <DatePicker sipDate={sipDate} setSipDate={setSipDate} />
            </div>
          </div>

          <p className="mb-2 space-y-2 text-sm font-medium tabular-nums">
            Available Balance: {formatToINR(balance)}
          </p>

          <div className="mt-auto flex w-full justify-between pt-4">
            <Button className="text-primary hover:bg-primary/15 bg-primary/10 w-[45%] p-5">
              Add To Cart
            </Button>
            <Button
              onClick={() => handleInvest("sip")}
              className="w-[45%] p-5 text-white"
            >
              Invest
            </Button>
          </div>
        </TabsContent>

        {/* =================== Lumpsum/One-Time Tab =================== */}

        <TabsContent value="lumpsum" className="flex h-full flex-col">
          <div className="mt-4 flex-grow space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium"> Amount</h2>
              <div className="input-wrapper text-muted-foreground relative w-1/2">
                <IndianRupeeIcon className="absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  required
                  className="peer invest-input"
                  min={fund?.lump_min}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleInvest("lumpsum")
                  }
                />
                <p className="invest-input-error">
                  Min lumpsum is ₹{fund?.lump_min}
                </p>
              </div>
            </div>
          </div>

          <p className="mb-2 text-sm font-medium tabular-nums">
            Available Balance: {formatToINR(balance)}
          </p>

          <div className="mt-auto flex w-full justify-between pt-4">
            <Button className="text-primary hover:bg-primary/15 bg-primary/10 w-[45%] p-5">
              Add To Cart
            </Button>
            <Button
              disabled={isPending}
              onClick={() => handleInvest("lumpsum")}
              className="w-[45%] p-5 text-white"
            >
              {isPending ? "Processing..." : "Invest"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DesktopPaymentCard;
