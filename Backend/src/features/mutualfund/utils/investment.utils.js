// prettier-ignore
export const calculateUpdatedPortfolio = (prevInv, investmentAmt, purchaseUnits) => {
  
  const newInvestedAmt = prevInv.invested.toNumber() + investmentAmt;
  const newUnits = prevInv.units.toNumber() + purchaseUnits;
  const newMv = prevInv.current.toNumber() + investmentAmt;
  const newPnl = newMv - newInvestedAmt;
  const newRoi = newInvestedAmt > 0 ? (newPnl / newInvestedAmt) * 100 : 0;

  return {
    invested: newInvestedAmt,
    units: newUnits,
    current: newMv,
    pnl: newPnl,
    returnPercent: newRoi,
  };
}
