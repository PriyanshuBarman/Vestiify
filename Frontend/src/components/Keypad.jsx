import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Keypad({ setAmount, className }) {
  const handleNumberClick = (num) => {
    setAmount((prev) => prev * 10 + num);
  };

  const handleBackspace = () => setAmount((prev) => Math.floor(prev / 10));

  return (
    <div className={cn("KeyPad grid grid-cols-3 gap-6", className)}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className="active:bg-input text-2xl font-normal"
          onClick={() => handleNumberClick(num)}
        >
          {num}
        </Button>
      ))}

      <Button
        variant="ghost"
        onClick={() => setAmount(0)}
        className={"text-lg font-normal"}
      >
        AC
      </Button>
      <Button
        variant="ghost"
        className="active:bg-input text-2xl font-normal"
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

export default Keypad;
