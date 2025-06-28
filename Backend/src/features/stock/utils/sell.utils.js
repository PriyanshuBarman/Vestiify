export const calculateUpdatedPortfolio = (prev, costBasis, quantity, price) => {
  const newInvestedAmt = prev.invested.toNumber() - costBasis;
  // const newMv = prev.current.toNumber() - sellAmount;
  const newQty = prev.quantity - quantity;
  const newMv = newQty * price;
  const newPnl = newMv - newInvestedAmt;
  const newRoi = newInvestedAmt > 0 ? (newPnl / newInvestedAmt) * 100 : 0;

  return {
    invested: newInvestedAmt,
    current: newMv,
    quantity: newQty,
    pnl: newPnl,
    returnPercent: newRoi,
  };
};
