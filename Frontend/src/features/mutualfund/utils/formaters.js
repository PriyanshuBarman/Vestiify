import { tz } from "@date-fns/tz";
import { format, setDate } from "date-fns";

/*
 * Formates Number to INR ex: 12555.12 -> ₹12,555
 */
export function formatToINR(num, maxFracDigits = 0) {
  const number = Number(num);

  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: maxFracDigits,
  }).format(number);

  return formatted;
}

export function formatFundCategory(category) {
  const arr = [
    "Fund of Funds",
    "Childrens Fund",
    "Retirement Fund",
    "Value Fund",
  ];
  return arr.includes(category) ? category : category?.replace(/\bFund\b/, "");
}

export function addSuffix(date) {
  if (!date) return "";
  return format(setDate(new Date(), date), "do", {
    in: tz("Asia/Kolkata"),
  });
}
