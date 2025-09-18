import PinKeypad from "@/components/PinKeypad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { createPin } from "../services/services";
import { useGetUserData } from "@/hooks/queries/internalQueries";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function PinSetupPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pin, setPin] = useState("");
  const inputRefs = useRef([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (pin) => createPin(pin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/auth/avatar-setup");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  // Handle pin updates from the keypad
  const handlePinChange = (value) => {
    if (value === "backspace") {
      setPin((prev) => prev.slice(0, -1));
    } else if (value && typeof value === "number") {
      if (pin.length < 4) {
        setPin((prev) => prev + value);
      }
    } else if (value === "AC") {
      setPin("");
    }
  };

  const handlePinChangeLg = (e) => {
    if (pin.length < 4) {
      setPin((prev) => prev + e.target.value);
    }
  };

  const handleFocus = () => {
    if (pin.length === 4) {
      inputRefs.current[3]?.focus();
    } else {
      inputRefs.current[pin.length]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[pin.length]?.focus();
  }, [pin]);

  const { data: user } = useGetUserData();
  if (user?.pin) {
    return <Navigate to="/mutual-funds#explore" />;
  }

  return (
    <div className="flex min-h-svh flex-col sm:justify-center sm:gap-4">
      {/* Top Content */}
      <div className="mt-10 flex flex-1 flex-col gap-y-8 px-6 sm:flex-0">
        <div className="text-center">
          <h1 className="mb-1 text-xl font-semibold">Set up your PIN</h1>
          <p className="text-muted-foreground text-sm">
            Create a secure 4-digit PIN
          </p>
        </div>

        {/* PIN Input */}
        <div className="mx-auto w-full max-w-sm">
          <p className="text-muted-foreground mb-4 text-center text-sm font-medium">
            Enter PIN
          </p>

          <div
            onClick={handleFocus}
            className="flex items-center justify-center gap-4"
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="Box relative">
                <Input
                  readOnly={isMobile}
                  onChange={!isMobile ? handlePinChangeLg : undefined}
                  disabled={
                    (pin.length !== i && pin.length !== 4) ||
                    (pin.length === 4 && i !== 3)
                  }
                  id={`pin-input-${i}`}
                  ref={(el) => (inputRefs.current[i] = el)}
                  value={pin.charAt(i) || ""}
                  className="focus:ring-primary size-12 rounded-lg text-center text-xl font-medium focus:ring-2 disabled:opacity-100"
                />
                {isMobile && pin.length === i && (
                  <div className="Fake-Cursor pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isMobile && <PinKeypad setPin={handlePinChange} />}

      <Button
        disabled={pin.length < 4 || isPending}
        size="lg"
        className="mx-auto my-6 w-[90%] font-medium sm:w-sm"
        onClick={() => mutate(pin)}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : "Confirm"}
      </Button>
    </div>
  );
}
