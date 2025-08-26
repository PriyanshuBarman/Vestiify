export const calculateUpdatedPortfolio = (prevInv, invested, quantity) => {
  const newInvested = prevInv.invested.toNumber() + invested;
  const newCurrent = prevInv.current.toNumber() + invested;
  const newQty = prevInv.quantity + quantity;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = newInvested > 0 ? (newPnl / newInvested) * 100 : 0;

  return {
    invested: newInvested,
    quantity: newQty,
    current: newCurrent,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
};
