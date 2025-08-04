import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

function StartSip() {
  return (
    <Card className="text-foreground relative mx-auto w-[90%] min-w-xs flex-row p-4 sm:w-full sm:px-6 sm:py-8">
      <div className="w-[70%] space-y-3">
        <CardTitle>
          <p className="text-sm font-medium sm:text-base">
            Invest every month and grow your wealth with SIP
          </p>
        </CardTitle>

        <Button className="text-xs">Start SIP</Button>
      </div>

      <img
        src="Small Cap.svg"
        alt="start sip"
        className="absolute top-8 right-8 size-15 dark:mix-blend-hard-light"
      />
    </Card>
  );
}

export default StartSip;
