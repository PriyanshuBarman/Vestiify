import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function PinKeypad({ setPin, className }) {
  const handleNumberClick = (num) => {
    setPin(num);
  };

  const handleBackspace = () => {
    setPin("backspace");
  };

  const handleClear = () => {
    setPin("AC");
  };

  return (
    <div className={cn("KeyPad grid grid-cols-3 gap-6", className)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className="active:bg-input text-2xl"
          onClick={() => handleNumberClick(num)}
        >
          {num}
        </Button>
      ))}

      <Button variant="ghost" onClick={handleClear} className={"text-lg"}>
        AC
      </Button>
      <Button
        variant="ghost"
        className="active:bg-input text-2xl"
        onClick={() => handleNumberClick(0)}
      >
        0
      </Button>
      <Button variant="ghost" onClick={handleBackspace} className="text-2xl">
        ⌫
      </Button>
    </div>
  );
}

export default PinKeypad;
