import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserData } from "@/hooks/queries/internalQueries";
import { IndianRupeeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useMakeInvestment, useStartSip } from "../hooks/mutations/mutations";
import { formatToINR } from "../utils/formaters";
import DatePicker from "./DatePicker";
import UpiDialog from "@/components/UpiDialog";

function DesktopPaymentCard({ fund }) {
  const [amount, setAmount] = useState("");
  const [sipDate, setSipDate] = useState();
  const [activeTab, setActiveTab] = useState("lumpsum");

  const { data: user = {} } = useGetUserData();
  const sipMutation = useStartSip();
  const lumpsumMutation = useMakeInvestment();

  const activeMutation = activeTab === "sip" ? sipMutation : lumpsumMutation;

  const { mutate: makePayment, isPending, isError } = activeMutation;

  const handleInvest = (pin) => {
    makePayment({ amount, sipDate, fund, pin });
  };

  return (
    <div className="bg-background fixed top-30 hidden h-[450px] w-[400px] rounded-xl border p-6 lg:right-[2%] lg:flex xl:right-30 xl:flex-col">
      <Tabs
        defaultValue="lumpsum"
        className="flex h-full w-full flex-col"
        onValueChange={setActiveTab}
      >
        <TabsList className="ring-muted-foreground/20 mb-4 w-full bg-transparent ring">
          <TabsTrigger
            value="lumpsum"
            className="data-[state=active]:text-primary data-[state=active]:bg-primary/10"
          >
            ONE-TIME
          </TabsTrigger>
          <TabsTrigger
            value="sip"
            className="data-[state=active]:text-primary data-[state=active]:bg-primary/10"
          >
            MONTHLY SIP
          </TabsTrigger>
        </TabsList>

        {/* =================== Lumpsum/One-Time Tab =================== */}

        <TabsContent value="lumpsum" className="flex h-full flex-col">
          <div className="mt-4 flex-grow space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium"> Amount</h2>
              <div className="input-wrapper text-muted-foreground relative w-1/2">
                <IndianRupeeIcon className="absolute top-2.5 left-3 h-4 w-4" />
                <Input
                  type="number"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  required
                  className="peer invest-input"
                  min={fund?.lump_min}
                />
                <p className="invest-input-error mt-2">
                  Min Lumpsum is ₹{fund?.lump_min}
                </p>
              </div>
            </div>
          </div>

          <p className="mb-6 text-sm font-medium tabular-nums">
            Available Balance: {formatToINR(user.balance)}
          </p>

          <UpiDialog
            amount={amount}
            sendingTo={fund.short_name}
            onSubmit={handleInvest}
            isPending={isPending}
            isError={isError}
          >
            <Button
              disabled={isPending || amount < fund.lump_min}
              size="lg"
              className="w-full"
            >
              {isPending ? <Loader2Icon className="animate-spin" /> : "Invest"}
            </Button>
          </UpiDialog>
        </TabsContent>

        {/* =================== SIP Tab =================== */}

        <TabsContent value="sip" className="flex h-full flex-col">
          <div className="mt-4 flex-grow space-y-10 px-2">
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
                />
                <p className="invest-input-error mt-2">
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
            Available Balance: {formatToINR(user.balance)}
          </p>

          <div className="pt-4">
            <UpiDialog
              amount={amount}
              sendingTo={fund.short_name}
              onSubmit={handleInvest}
              isPending={isPending}
              isError={isError}
            >
              <Button
                disabled={isPending || amount < fund.sip_min || !sipDate}
                size="lg"
                className="w-full"
              >
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Start Sip"
                )}
              </Button>
            </UpiDialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DesktopPaymentCard;
