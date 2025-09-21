import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatToINR } from "@/features/mutualfund/utils/formaters";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useSendMoney } from "../hooks/mutations/mutations";
import ResponsivePinDialog from "@/components/ResponsivePinDialog";
import { sanitizeAmount } from "@/utils/formatrs";

function EnterAmountPage() {
  const navigate = useNavigate();
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const { fullName, username, avatar } = useLocation().state ?? {};
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState();

  const { mutate: makePayment, isPending, isError } = useSendMoney();

  const handleSubmit = (pin) => {
    makePayment({ amount, note, receiverUsername: username, pin, fullName });
  };

  return (
    <div className="relative h-dvh sm:mx-auto sm:h-fit sm:w-xl">
      <GoBackBar />

      <div className="mt-8 w-full place-items-center space-y-4">
        <Avatar className="size-16">
          <AvatarImage src={avatar} alt="profile-picture" />
          <AvatarFallback className="text-xl uppercase">
            {fullName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium capitalize">{fullName}</h3>
          <p className="text-muted-foreground text-sm">@{username}</p>
        </div>

        <Label className="flex w-full justify-center text-5xl">
          <span>₹</span>
          <input
            autoComplete="off"
            type="text"
            inputMode="numeric"
            autoFocus
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
            className="field-sizing-content outline-none"
          />
        </Label>

        <Textarea
          onChange={(e) => setNote(e.target.value)}
          value={note}
          placeholder="Add Note"
          className="min-h-0 w-fit max-w-3/4 resize-none overflow-hidden text-center text-sm"
        />
      </div>
      <Button
        disabled={!amount || !fullName || !username || isPending}
        className="absolute right-6 bottom-6 rounded-2xl px-7 py-7"
        onClick={() => setIsPinDialogOpen(true)}
      >
        <ArrowRightIcon className="size-8" />
      </Button>

      <ResponsivePinDialog
        isOpen={isPinDialogOpen}
        setIsOpen={setIsPinDialogOpen}
        amount={amount}
        sendingTo={fullName}
        onSubmit={handleSubmit}
        isPending={isPending}
        isError={isError}
      />
    </div>
  );
}

export default EnterAmountPage;
