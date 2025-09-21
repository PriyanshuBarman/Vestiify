import PinKeypad from "@/components/PinKeypad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createPin } from "../services/services";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

function PinSetupPage() {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (pin) => createPin(pin),
    onSuccess: () => {
      queryClient.setQueryData(["user"], (prev) => {
        return { ...prev, hasPin: true };
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return (
    <div className="flex h-dvh flex-col sm:justify-center sm:gap-4">
      {/* Top Content */}
      <div className="mt-10 flex flex-1 flex-col gap-y-8 px-6 sm:flex-0">
        <div className="text-center">
          <h1 className="mb-1 text-xl font-semibold">Set up your PIN</h1>
          <p className="text-muted-foreground text-sm">
            Create a secure 4-digit PIN
          </p>
        </div>

        {/* PIN Input */}
        <div className="mx-auto w-full max-w-sm place-items-center">
          <p className="text-muted-foreground mb-4 text-center text-sm font-medium">
            Enter PIN
          </p>

          <InputOTP
            autoFocus
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            value={pin}
            onChange={(value) => {
              if (pin.length === 4 && value.length === 4 && value !== pin)
                return;
              if (value.length <= 4) setPin(value);
            }}
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot
                className="size-13  text-base font-medium shadow-xs first:rounded-xl"
                index={0}
              />
              <InputOTPSlot
                className="size-13  rounded-xl text-base font-medium shadow-xs"
                index={1}
              />
              <InputOTPSlot
                className="size-13  rounded-xl text-base font-medium shadow-xs"
                index={2}
              />
              <InputOTPSlot
                className="size-13  text-base font-medium shadow-xs last:rounded-xl"
                index={3}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <Button
        disabled={pin.length < 4 || isPending}
        size="lg"
        className="mx-auto my-4 w-[90%] font-medium sm:w-sm"
        onClick={() => mutate(pin)}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : "Confirm"}
      </Button>
    </div>
  );
}

export default PinSetupPage;
