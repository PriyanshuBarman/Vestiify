// prettier-ignore
export const calculateUpdatedPortfolio = (prevInv, investmentAmt, purchaseUnits) => {
  
  const newInvestedAmt = prevInv.investedAmt.toNumber() + investmentAmt;
  const newUnits = prevInv.units.toNumber() + purchaseUnits;
  const newMv = prevInv.marketValue.toNumber() + investmentAmt;
  const newPnl = newMv - newInvestedAmt;
  const newRoi = newInvestedAmt > 0 ? (newPnl / newInvestedAmt) * 100 : 0;

  return {
    investedAmt: newInvestedAmt,
    units: newUnits,
    marketValue: newMv,
    pnl: newPnl,
    roi: newRoi,
  };
}
