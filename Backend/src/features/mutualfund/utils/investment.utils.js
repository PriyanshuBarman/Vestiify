// prettier-ignore
export const calculateUpdatedPortfolio = (prevInv, invested, purchaseUnits) => {
  
  const newInvested = prevInv.invested.toNumber() + invested;
  const newUnits = prevInv.units.toNumber() + purchaseUnits;
  const newCurrent = prevInv.current.toNumber() + invested;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = newInvested > 0 ? (newPnl / newInvested) * 100 : 0;

  return {
    invested: newInvested,
    units: newUnits,
    current: newCurrent,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
}
