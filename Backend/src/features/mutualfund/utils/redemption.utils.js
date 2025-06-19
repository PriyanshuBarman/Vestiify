export const calculateUpdatedPortfolio = (
  fund,
  costBasis,
  redemptionAmt,
  redemptionUnits
) => {
  const investedAmt = fund.investedAmt.toNumber() - costBasis;
  const marketValue = fund.marketValue.toNumber() - redemptionAmt;
  const units = fund.units.toNumber() - redemptionUnits;
  const pnl = marketValue - investedAmt;
  const roi = investedAmt > 0 ? (pnl / investedAmt) * 100 : 0;

  return { investedAmt, marketValue, units, pnl, roi };
};