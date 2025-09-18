import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatToINR } from "@/features/mutualfund/utils/formaters";
import { useGetBalance } from "@/hooks/queries/internalQueries";
import { IndianRupeeIcon, ScanLine, UserIcon } from "lucide-react";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const { data: balance } = useGetBalance();

  return (
    <div className="mt-4 space-y-8 px-4 sm:mx-auto sm:w-3xl sm:space-y-12">
      <h2 className="space-x-2 leading-0">
        <span className="font-[450] italic">Balance.</span>
        <span className="text-2xl font-semibold tabular-nums">
          {formatToINR(balance, 2)}
        </span>
      </h2>

      {/* Quick Options */}
      <section className="flex justify-between">
        <div className="Slot flex flex-col items-center justify-center">
          <Button
            onClick={() => navigate("/upi/send")}
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <UserIcon className="text-primary size-6.5 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Send Money
          </p>
        </div>
        <div className="Slot flex flex-col items-center justify-center">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <ScanLine className="text-primary size-6.5 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Scan & Pay
          </p>
        </div>
        <div className="Slot flex flex-col items-center justify-center">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <IndianRupeeIcon className="text-primary size-6.5 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Request Money
          </p>
        </div>
      </section>

      {/* UPI Requests */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium sm:font-semibold">UPI Requests</h2>

        <Card>
          <div>
            <img
              src="Notebook-bro.svg"
              alt=""
              className="mx-auto size-50 sm:size-70"
            />
            <p className="mt-2 text-center text-sm font-medium sm:text-base">
              No Pending UPI Requests
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
export default HomePage;
