import { TZDate } from "@date-fns/tz";
import {
  getNextBusinessDate,
  getPrevBusinessDate,
  isBusinessDay,
} from "../../shared/utils/holidays.utils.js";

// Type of Fund                    Order placement(cut off)         NAV Applicability
//---------------------------------------------------------------------------------------

// Liquid / Overnight                   Before 12:30                   Previous day

// Liquid / Overnight                   After 12:30                    same day

// All Other Funds                      Before 2:00 pm                 same day

// All Other Funds                      After 2:00 pm                  next business day

/*  Scheduled date calculation
 * simple just applicable NAV date + 1, except for the orders which are placed on liquid/overnight funds before cutoff (will be applicable NAV date + 2)
 * Orders placed on Saturdays, Sundays, and other market holidays will be treated as orders placed on the next business day.
 */

export function getNavAndProcessDateForInvestment(fundCategory) {
  const today = TZDate.tz("Asia/Kolkata");
  const orderMinutes = today.getHours() * 60 + today.getMinutes();
  const isLiquidOrOvernight = isLiquidOrOvernightFund(fundCategory);
  const cutoffMinutes = isLiquidOrOvernight ? 12 * 60 : 14 * 60;

  // If today is not a business day, treat as next business day
  if (!isBusinessDay(today)) {
    return {
      navDate: getNextBusinessDate(), // T day is next business day
      processDate: getNextBusinessDate(1), // T+1 business day
    };
  }

  // Liquid/Overnight Funds
  if (isLiquidOrOvernight) {
    // Before cutoff
    if (orderMinutes < cutoffMinutes) {
      return {
        navDate: getPrevBusinessDate(), // T-1 day NAV
        processDate: getNextBusinessDate(), // Next business day
      };
    }
    // After cutoff
    return {
      navDate: today, // Same day NAV
      processDate: getNextBusinessDate(), // Next business day
    };
  }

  // All other Funds
  // Before cutoff
  if (orderMinutes < cutoffMinutes) {
    return {
      navDate: today, // Same day NAV
      processDate: getNextBusinessDate(), // Next business day
    };
  }
  // After cutoff
  return {
    navDate: getNextBusinessDate(), // Next business day NAV
    processDate: getNextBusinessDate(1), // T+1 business day
  };
}

export function getNavAndProcessDateForRedemption() {
  const today = TZDate.tz("Asia/Kolkata");
  const orderMinutes = today.getHours() * 60 + today.getMinutes();
  const cutoffMinutes = 15 * 60; // 3:00 PM cutoff for redemptions

  // If today is not a business day, treat as next business day
  if (!isBusinessDay(today)) {
    return {
      navDate: getNextBusinessDate(), // T day is next business day
      processDate: getNextBusinessDate(1), // T+1 business day
    };
  }

  // Before cutoff
  if (orderMinutes < cutoffMinutes) {
    return {
      navDate: today, // Same day NAV
      processDate: getNextBusinessDate(), // Next business day
    };
  }
  // After cutoff
  return {
    navDate: getNextBusinessDate(), // Next business day NAV
    processDate: getNextBusinessDate(1), // T+1 business day
  };
}

function isLiquidOrOvernightFund(fundCategory) {
  return fundCategory === "Liquid Fund" || fundCategory === "Overnight Fund";
}
