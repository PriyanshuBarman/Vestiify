import {
  getNextBusinessDate,
  getPrevBusinessDate,
  isBusinessDay,
} from "../../src/shared/utils/holidays.utils.js";

export function getNavAndProcessDateForSip(date, fundCategory) {
  const installmentDate = date;
  const isLiquidOrOvernight = isLiquidOrOvernightFund(fundCategory);

  // If installmentDate is not a business day, treat as next business day
  if (!isBusinessDay(installmentDate)) {
    return {
      navDate: getNextBusinessDate(0, installmentDate), // T day is next business day
      processDate: getNextBusinessDate(1, installmentDate), // T+1 business day
    };
  }

  // All SIP installments process before cutoff
  if (isLiquidOrOvernight) {
    return {
      navDate: getPrevBusinessDate(0, installmentDate), // T-1 day NAV
      processDate: getNextBusinessDate(0, installmentDate), // Next business day
    };
  } else {
    return {
      navDate: installmentDate, // Same day NAV
      processDate: getNextBusinessDate(0, installmentDate), // Next business day
    };
  }
}

function isLiquidOrOvernightFund(fundCategory) {
  return fundCategory === "Liquid Fund" || fundCategory === "Overnight Fund";
}
