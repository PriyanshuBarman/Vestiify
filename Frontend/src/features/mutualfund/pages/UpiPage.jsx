import Upi from "@/components/Upi";
import { useLocation } from "react-router";
import { useMakeInvestment, useStartSip } from "../hooks/mutations/mutations";
import { useGetFundData } from "../hooks/queries/externalQueries";

function UpiPage() {
  const location = useLocation();
  const { schemeCode, amount, sipDate } = location.state;
  const { data: fund } = useGetFundData(schemeCode);

  const sipMutation = useStartSip();
  const lumpsumMutation = useMakeInvestment();

  const activeMutation = sipDate ? sipMutation : lumpsumMutation;

  const { mutate: makePayment, isPending, isError } = activeMutation;

  const handleSubmit = (pin) => {
    makePayment({ amount, sipDate, fund, pin });
  };

  return (
    <Upi
      isError={isError}
      isPending={isPending}
      amount={amount}
      sendingTo={fund?.short_name}
      onSubmit={handleSubmit}
    />
  );
}

export default UpiPage;
