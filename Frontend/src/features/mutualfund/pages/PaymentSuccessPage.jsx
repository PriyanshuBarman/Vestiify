import { CheckIcon } from "lucide-react";
import { useParams } from "react-router";
import { formatToINR } from "../utils/formaters";
import { Button } from "@/components/ui/button";

function PaymentSuccessPage() {
  const { amount, fundName } = useParams();

  return (
    <div>
      <div className="mt-[50%] flex flex-col items-center gap-8">
        <div className="bg-primary ring-primary/50 w-fit rounded-full ring-6">
          <CheckIcon className="size-20 stroke-3 p-4" />
        </div>

        <div>
          <h2 className="text-xl font-medium">SIP Order Placed</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            SIP of {formatToINR(amount)} in {fundName}{" "}
          </p>
        </div>
      </div>
      <Button
        size="lg"
        className="absolute bottom-8 left-1/2 w-[90%] -translate-x-1/2"
      >
        Done
      </Button>
    </div>
  );
}

export default PaymentSuccessPage;
