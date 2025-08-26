import { TZDate } from "@date-fns/tz";
import { addMonths } from "date-fns";

export const getNextInstallmentDate = (dateOfMonth) => {
  const nextInstallmentDate = addMonths(TZDate.tz("Asia/Kolkata"), 1);
  nextInstallmentDate.setDate(dateOfMonth);

  return nextInstallmentDate;
};
