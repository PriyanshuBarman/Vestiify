import { useState } from "react";
import { toast } from "sonner";
import { CalendarIcon, IndianRupeeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBalance } from "@/hooks/queries/internalQueries";
import { useMakeInvestment } from "../hooks/mutations/mutations";

function InvestFormDesktop({ fund }) {
  const [amount, setAmount] = useState("");
  const { mutate: invest, isPending } = useMakeInvestment();
  const { data: balance } = useGetBalance();

  const handleInvest = () => {
    if (amount === "") return toast.error("Please enter amount");
    if (amount < fund?.lump_min) return;
    invest({ amount, fund });
  };

  return (
    <div className="bg-background fixed top-30 hidden h-[450px] w-[400px] rounded-xl border p-6 lg:right-[2%] lg:flex xl:right-30 xl:flex-col">
      <Tabs defaultValue="sip" className="flex h-full flex-col">
        <TabsList className="ring-muted-foreground/20 mb-4 w-full bg-transparent ring">
          <TabsTrigger value="sip" className="data-[state=active]:text-primary data-[state=active]:bg-primary/10">
            MONTHLY SIP
          </TabsTrigger>
          <TabsTrigger value="onetime" className="data-[state=active]:text-primary data-[state=active]:bg-primary/10">
            ONE-TIME
          </TabsTrigger>
        </TabsList>

        {/* =================== SIP Tab =================== */}

        <TabsContent value="sip" className="flex h-full flex-col">
          <div className="mt-4 flex-grow space-y-6 px-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium"> SIP Amount</h2>
              <div className="input-wrapper text-muted-foreground relative w-1/2">
                <IndianRupeeIcon className="absolute top-2.5 left-3 h-4 w-4" />
                <Input type="number" placeholder="SIP Amount" className="pl-8 shadow-none" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Monthly SIP Data</h2>
              <div className="input-wrapper text-muted-foreground relative w-1/2">
                <CalendarIcon className="absolute top-2.5 left-3 h-4 w-4" />
                <Input placeholder="25th" className="pl-8 shadow-none" />
              </div>
            </div>
          </div>

          <div className="mb-2 space-y-2">
            <p className="text-sm font-medium">Available Balance: ₹{balance}</p>
            <p className="text-muted-foreground text-xs">Next SIP installment on 25 of Jun</p>
          </div>

          <div className="mt-auto flex w-full justify-between pt-4">
            <Button className="text-primary hover:bg-primary/15 bg-primary/10 w-[45%] p-5">Add To Cart</Button>
            <Button className="w-[45%] p-5 text-white">Invest</Button>
          </div>
        </TabsContent>

        {/* =================== Lumpsum/One-Time Tab =================== */}

        <TabsContent value="onetime" className="flex h-full flex-col">
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
                  onKeyDown={(e) => e.key === "Enter" && handleInvest()}
                />
                <p className="invest-input-error">Min lumpsum is ₹{fund?.lump_min}</p>
              </div>
            </div>
          </div>

          <p className="mb-2 text-sm font-medium">Available Balance: ₹{balance}</p>

          <div className="mt-auto flex w-full justify-between pt-4">
            <Button className="text-primary hover:bg-primary/15 bg-primary/10 w-[45%] p-5">Add To Cart</Button>
            <Button disabled={isPending} onClick={handleInvest} className="w-[45%] p-5 text-white">
              {isPending ? "Processing..." : "Invest"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default InvestFormDesktop;
