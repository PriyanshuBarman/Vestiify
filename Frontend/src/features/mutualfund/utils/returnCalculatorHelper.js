export const calculateAbsoluteReturn = (annualizedReturn, years) => {
  const annualizedReturnDecimal = annualizedReturn / 100;
  const absoluteReturnDecimal =
    Math.pow(1 + annualizedReturnDecimal, years) - 1;

  const absoluteReturnPercentage = absoluteReturnDecimal * 100;
  return absoluteReturnPercentage.toFixed(2);
};
