export const calculateUpdatedPortfolio = (
  fund,
  costBasis,
  redemptionAmt,
  redemptionUnits
) => {
  const invested = fund.invested.toNumber() - costBasis;
  const current = fund.current.toNumber() - redemptionAmt;
  const units = fund.units.toNumber() - redemptionUnits;
  const pnl = current - invested;
  const returnPercent = invested > 0 ? (pnl / invested) * 100 : 0;

  return { invested, current, units, pnl, returnPercent };
};
