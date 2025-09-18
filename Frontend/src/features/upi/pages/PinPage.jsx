import Upi from "@/components/Upi";
import { useLocation } from "react-router";
import { useSendMoney } from "../hooks/mutations/mutations";

function PinPage() {
  const location = useLocation();
  const { amount, note, name, username } = location.state;

  const { mutate: makePayment, isPending, isError } = useSendMoney();

  const handleSubmit = (pin) => {
    makePayment({ amount, note, receiverUsername: username, pin });
  };

  return (
    <Upi
      isError={isError}
      isPending={isPending}
      amount={amount}
      sendingTo={name}
      onSubmit={handleSubmit}
    />
  );
}

export default PinPage;
