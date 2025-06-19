import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardDescription } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const base = "https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light";
const cards = [
  { label: "Compare Funds", img: `${base}/compare_funds.svg` },
  { label: "Sip Calculator", img: `${base}/calculator.svg` },
  { label: "Import Funds", img: `${base}/import_funds.svg` },
  { label: "NFOs", img: `${base}/nfo.svg` },
];

function QuickAccess() {
  return (
    <section className="swiper-no-swiping">
      <SectionHeading heading={"Quick Access"} />

      <ScrollArea>
        <div className="flex w-full justify-between gap-4 px-4 sm:my-1 sm:px-0">
          {cards.map(({ label, img }) => (
            <Card
              key={label}
              className="min-w-40 cursor-pointer transition-all duration-500 hover:scale-101 max-sm:px-3 sm:w-47"
            >
              <div className="flex gap-8 sm:flex-col sm:gap-1">
                <CardHeader>
                  <img
                    src={img}
                    alt={label}
                    className="min-h-6 min-w-6 sm:size-7 dark:brightness-0 dark:invert"
                    loading="lazy"
                  />
                </CardHeader>
                <CardTitle className="mt-0.5 text-[0.8rem] font-medium sm:text-base">{label}</CardTitle>
              </div>
              <CardDescription className="mt-2 text-xs sm:hidden">Lorem ipsum dolor sit</CardDescription>
            </Card>
          ))}
        </div>

        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}

export default QuickAccess;
