export const calculateUpdatedPortfolio = (prevInv, investmentAmt, quantity) => {
    
  const newInvestedAmt = prevInv.investedAmt.toNumber() + investmentAmt;
  const newMv = prevInv.marketValue.toNumber() + investmentAmt;
  const newQty = prevInv.quantity + quantity;
  const newPnl = newMv - newInvestedAmt;
  const newRoi = newInvestedAmt > 0 ? (newPnl / newInvestedAmt) * 100 : 0;

  return {
    investedAmt: newInvestedAmt,
    quantity: newQty,
    marketValue: newMv,
    pnl: newPnl,
    roi: newRoi,
  };
};
