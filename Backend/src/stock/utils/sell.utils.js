export const calculateUpdatedPortfolio = (prev, costBasis, quantity, price) => {
  const newInvested = prev.invested.toNumber() - costBasis;
  const newCurrent = newQty * price;
  const newQty = prev.quantity - quantity;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = newInvested > 0 ? (newPnl / newInvested) * 100 : 0;

  return {
    invested: newInvested,
    current: newCurrent,
    quantity: newQty,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
};
