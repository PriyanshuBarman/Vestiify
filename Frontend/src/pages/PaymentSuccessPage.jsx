import GoBackBar from "@/components/GoBackBar";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

function PaymentSuccessPage() {
  const { title, description, orderDetailsRoute } = useLocation().state ?? {};

  return (
    <div className="flex h-dvh flex-col sm:mx-auto sm:w-sm">
      <GoBackBar />
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <div className="bg-primary animate-in zoom-in ring-primary/50 w-fit rounded-full ring-6 duration-500">
          <CheckIcon className="text-background animate-in spin-in-90 zoom-in size-20 stroke-3 p-4 duration-500" />
        </div>

        <div>
          <h2 className="text-center text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground mx-8 mt-2 text-center text-sm">
            {description}
          </p>
        </div>
      </div>

      <div className="animate-in fade-in mt-auto flex w-full flex-col items-center justify-end gap-4 pb-10 duration-1000 sm:mt-16">
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
          <Link to="/" replace>
            Done
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
