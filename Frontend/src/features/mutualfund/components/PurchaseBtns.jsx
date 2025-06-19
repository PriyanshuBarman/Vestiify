import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function PurchaseBtns({ fund }) {
  const navigate = useNavigate();

  return (
    <div className="bg-background fixed bottom-0 flex w-full justify-evenly py-4">
      <Button
        size="lg"
        onClick={() => navigate(`/mutual-funds/one-time/${fund?.code}`)}
        className="text-primary bg-primary/15 w-[42%]"
      >
        ONE-TIME
      </Button>
      <Button size="lg" className="w-[42%] text-white">
        MONTHLY-SIP
      </Button>
    </div>
  );
}

export default PurchaseBtns;
