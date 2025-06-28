export const calculateUpdatedPortfolio = (prevInv, investmentAmt, quantity) => {
  const newInvestedAmt = prevInv.invested.toNumber() + investmentAmt;
  const newMv = prevInv.current.toNumber() + investmentAmt;
  const newQty = prevInv.quantity + quantity;
  const newPnl = newMv - newInvestedAmt;
  const newRoi = newInvestedAmt > 0 ? (newPnl / newInvestedAmt) * 100 : 0;

  return {
    invested: newInvestedAmt,
    quantity: newQty,
    current: newMv,
    pnl: newPnl,
    returnPercent: newRoi,
  };
};
