import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { useState } from "react";
import FundLogo from "./FundLogo";
import ReturnCalculator from "./ReturnCalculator";
import SimilarFundsTable from "./SimilarFundsTable";

function Accordians({ fund = {} }) {
  const [textClamp, setTextClamp] = useState(true);

  return (
    <Accordion type="multiple" className="mt-10 border-t border-b">
      <AccordionItem value="item-1" className="px-4 py-3 sm:border-transparent sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl">Return Calculator</AccordionTrigger>
        <AccordionContent className="py-4">
          <ReturnCalculator fund={fund} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="px-4 py-3 sm:border-transparent sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl">Expense ratio, exit load & tax</AccordionTrigger>
        <AccordionContent className="py-4">
          <ul className="mt-2 list-disc space-y-5 pl-4">
            <li>
              <h5 className="text-sm font-medium sm:text-base sm:font-semibold">
                Expense ratio : {fund.expense_ratio}%
              </h5>
              <p className="text-muted-foreground sm:text-foreground mt-1 sm:mt-2 sm:text-base">Inclusive of GST</p>
            </li>
            <li>
              <h5 className="text-sm font-medium sm:text-base sm:font-semibold">Portfolio turnover</h5>
              <p className="text-muted-foreground sm:text-foreground mt-1 sm:mt-2 sm:text-base">
                {parseFloat(fund.portfolio_turnover).toFixed(2) || "Nill"}%
              </p>
            </li>
            <li>
              <h5 className="text-sm font-medium sm:text-base sm:font-semibold">Exit load</h5>
              <p className="text-muted-foreground sm:text-foreground mt-1 sm:mt-2 sm:text-base">
                {fund.exit_load || "Nill"}
              </p>
            </li>
            <li>
              <h5 className="text-sm font-medium sm:text-base sm:font-semibold">Tax implications</h5>
              <p className="text-muted-foreground sm:text-foreground mt-1 text-sm/4.5 sm:mt-2 sm:text-base">
                Returns are taxed at 20%, if you redeem before one year. After 1 year, you are required to pay LTCG tax
                of 12.5% on returns of Rs 1.25 lakh+ in a financial year.
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="py-3 sm:border-transparent sm:py-4">
        <AccordionTrigger className="px-4 text-base sm:px-0 sm:text-xl">Similar funds</AccordionTrigger>
        <AccordionContent className="py-4">
          <SimilarFundsTable fund={fund} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="px-4 py-3 sm:border-transparent sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl">Fund managers</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {fund.fund_manager?.split(";").map((manager, index) => (
            <div key={index} className="mt-2 ml-2 flex items-center gap-2">
              <Avatar className="border sm:size-10">
                <User className="m-auto size-full p-1.5 sm:p-2" />
              </Avatar>
              <span className="ml-2 sm:text-base sm:font-medium">{manager}</span>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="px-4 py-3 sm:border-transparent sm:px-0 sm:py-4">
        <AccordionTrigger className="text-base sm:text-xl">Fund house & investment objective</AccordionTrigger>
        <AccordionContent className="space-y-8">
          <div className="mt-4 flex items-center gap-2">
            <FundLogo logoCode={fund.short_code} />
            <h2 className="ml-2 text-sm sm:text-base sm:font-medium">{fund.fund_name}</h2>
          </div>

          <div className="AUM Details relative space-y-6 sm:flex sm:flex-wrap sm:justify-between sm:gap-y-6 sm:text-base">
            <p className="flex w-full justify-between sm:w-[45%]">
              <span className="sm:text-muted-foreground">Rank ( total assets )</span>
              <span className="sm:font-medium">#14 in India</span>
            </p>
            <p className="flex w-full justify-between sm:w-[45%]">
              <span className="sm:text-muted-foreground">Total AUM</span>
              <span className="sm:font-medium">$4393987 Crors</span>
            </p>

            <Separator orientation="vertical" className="absolute left-1/2 max-sm:hidden" />

            <p className="flex w-full justify-between sm:w-[45%]">
              <span className="sm:text-muted-foreground">Date of incorporation</span>
              <span className="sm:font-medium">20 January 2025</span>
            </p>
          </div>

          <div>
            <h5 className="font-medium">Investment Objective</h5>
            <p
              onClick={() => setTextClamp(!textClamp)}
              className={`text-muted-foreground sm:text-foreground mt-4 text-sm/4.5 sm:mt-2 sm:text-base ${textClamp ? "line-clamp-3" : ""}`}
            >
              {fund.investment_objective}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Accordians;
