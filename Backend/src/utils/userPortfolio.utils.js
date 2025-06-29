export const calculatePortfolioAfterSell = (userPortfolio, redemptionAmt, costBasis) => {
  const newInvested = costBasis
    ? userPortfolio.invested.toNumber() - costBasis
    : userPortfolio.invested.toNumber() - redemptionAmt;
  const newCurrent = userPortfolio.invested.toNumber() - redemptionAmt;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = (newPnl / newInvested) * 100;

  return {
    invested: newInvested,
    current: newCurrent,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
};

export const calculatePortfolioAfterBuy = (userPortfolio, invested) => {
  const newInvested = userPortfolio.invested.toNumber() + invested;
  const newCurrent = userPortfolio.invested.toNumber() + invested;
  const newPnl = newCurrent - newInvested;
  const newReturnPercent = (newPnl / newInvested) * 100;

  return {
    invested: newInvested,
    current: newCurrent,
    pnl: newPnl,
    returnPercent: newReturnPercent,
  };
};
