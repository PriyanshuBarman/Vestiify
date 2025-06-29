export const calculateUpdatedPortfolio = (fund, costBasis, redemptionAmt, redemptionUnits) => {
  const newInvested = fund.invested.toNumber() - costBasis;
  const newCurrent = fund.current.toNumber() - redemptionAmt;
  const newUnits = fund.units.toNumber() - redemptionUnits;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = newInvested > 0 ? (newPnl / newInvested) * 100 : 0;

  return {
    invested: newInvested,
    current: newCurrent,
    units: newUnits,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
};
