import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { formatToINR } from "../utils/formaters";

function PaymentSuccessPage() {
  const { amount, fundName, orderType, orderDetailsRoute } =
    useLocation().state ?? {};

  return (
    <div className="h-dvh md:mx-auto md:w-sm">
      <div className="flex h-1/2 flex-col items-center justify-center gap-8">
        <div className="bg-primary ring-primary/50 w-fit rounded-full ring-6">
          <CheckIcon className="text-background size-20 stroke-3 p-4" />
        </div>

        <div>
          <h2 className="text-center text-xl font-medium">Order Placed</h2>
          <p className="text-muted-foreground mx-8 mt-2 text-center text-sm">
            {orderType} of {formatToINR(amount, 2)} in {fundName}{" "}
          </p>
        </div>
      </div>

      <div className="flex h-1/2 flex-col items-center justify-end gap-4 pb-10 md:h-1/4">
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="text-primary bg-primary/15 w-[90%]"
        >
          <Link to={orderDetailsRoute} replace>
            Order Details
          </Link>
        </Button>
        <Button asChild size="lg" className="w-[90%]">
          <Link to="/mutual-funds/#explore" replace>
            Done
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
