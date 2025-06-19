export const calculateUpdatedPortfolio = (prev, costBasis, quantity, price) => {
  const newInvestedAmt = prev.investedAmt.toNumber() - costBasis;
  // const newMv = prev.marketValue.toNumber() - sellAmount;
  const newQty = prev.quantity - quantity;
  const newMv = newQty * price;
  const newPnl = newMv - newInvestedAmt;
  const newRoi = newInvestedAmt > 0 ? (newPnl / newInvestedAmt) * 100 : 0;

  return {
    investedAmt: newInvestedAmt,
    marketValue: newMv,
    quantity: newQty,
    pnl: newPnl,
    roi: newRoi,
  };
};
