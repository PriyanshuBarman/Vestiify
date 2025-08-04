import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardDescription } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const base =
  "https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light";
const cardsMapping = [
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
        <div className="flex justify-between gap-4 px-4 sm:m-1 sm:gap-4.5 sm:px-0">
          {cardsMapping.map(({ label, img }) => (
            <Card
              key={label}
              className="w-36 cursor-pointer gap-2 p-3 duration-500 hover:scale-101 sm:w-46 sm:min-w-40 sm:p-4 sm:transition-all"
            >
              <CardContent className="flex flex-col items-start gap-1 p-0">
                <img
                  src={img}
                  alt={label}
                  className="min-h-6 min-w-6 sm:size-7 dark:brightness-0 dark:invert"
                  loading="lazy"
                />
                <CardTitle className="text-[0.8rem] font-normal sm:text-base">
                  {label}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>

        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}

export default QuickAccess;
