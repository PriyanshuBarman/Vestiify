import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function PurchaseBtns({ fund, isPending }) {
  const navigate = useNavigate();

  return (
    <div className="bg-background fixed bottom-0 flex w-full justify-evenly py-4">
      <Button
        className="text-primary bg-primary/15 w-[42%]"
        size="lg"
        disabled={isPending}
        onClick={() =>
          navigate("/mutual-funds/invest", {
            state: { orderType: "oneTime", schemeCode: fund.scheme_code },
          })
        }
      >
        ONE-TIME
      </Button>

      <Button
        size="lg"
        disabled={isPending}
        onClick={() =>
          navigate(`/mutual-funds/invest`, {
            state: { orderType: "sip", schemeCode: fund.scheme_code },
          })
        }
        className="w-[42%]"
      >
        MONTHLY-SIP
      </Button>
    </div>
  );
}

export default PurchaseBtns;
