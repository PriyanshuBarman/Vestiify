import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { normalizeAmount } from "@/utils/formatr";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

function EnterAmountPage() {
  const navigate = useNavigate();
  const { name, username, avatar } = useLocation().state ?? {};
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState();

  const handleInvest = () => {
    if (!amount) return toast.error("Please enter amount");
    navigate(`/upi/pin`, {
      state: {
        amount,
        note,
        name,
        username,
      },
    });
  };

  return (
    <div className="h-dvh">
      <GoBackBar />

      <div className="mt-8 w-full place-items-center space-y-4">
        <Avatar className="size-16">
          <AvatarImage src={avatar} />
          <AvatarFallback />
        </Avatar>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-muted-foreground text-sm">@{username}</p>
        </div>

        <Label className="flex w-full justify-center text-5xl">
          <span>₹</span>
          <input
            autoComplete="tel"
            type="text"
            inputMode="numeric"
            autoFocus
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(normalizeAmount(e.target.value))}
            onKeyDown={(e) => e.key === "Enter" && handleInvest()}
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
        onClick={handleInvest}
        className="absolute right-6 bottom-6 rounded-2xl px-7 py-7"
      >
        <ArrowRightIcon className="size-8" />
      </Button>
    </div>
  );
}

export default EnterAmountPage;
