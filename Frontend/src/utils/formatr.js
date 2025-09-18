export const normalizeAmount = (value) => {
  if (!value) return;
  // Remove any non-digit and non-dot characters
  value = value.replace(/[^\d.]/g, "");

  // Handle leading zeros (but allow "0." at start)
  if (value.startsWith("00")) {
    value = "0" + value.slice(2);
  } else if (
    value.length > 1 &&
    value.startsWith("0") &&
    !value.includes(".")
  ) {
    value = value.slice(1);
  }

  // Handle decimal places
  if (value.includes(".")) {
    const [integer, decimal] = value.split(".");
    // Keep only first 2 decimal digits (max 2 decimals)
    const limitedDecimal = decimal ? `.${decimal.slice(0, 2)}` : ".";
    value = integer + limitedDecimal;
  }

  // Handle single dot
  if (value === ".") {
    value = "0.";
  }

  return value;
};
