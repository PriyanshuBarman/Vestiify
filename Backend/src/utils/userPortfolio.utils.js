export const calculatePortfolioAfterSell = (userPortfolio, redemptionAmt, costBasis) => {
  const newTotalInv = costBasis
    ? userPortfolio.invested.toNumber() - costBasis
    : userPortfolio.invested.toNumber() - redemptionAmt;
  const newTotalMv = userPortfolio.invested.toNumber() - redemptionAmt;
  const newTotalPnl = newTotalMv - newTotalInv;
  const newTotalRoi = (newTotalPnl / newTotalInv) * 100;

  return {
    invested: newTotalInv,
    current: newTotalMv,
    pnl: newTotalPnl,
    returnPercent: newTotalRoi,
  };
};

export const calculatePortfolioAfterBuy = (userPortfolio, investmentAmt) => {
  const newTotalInv = userPortfolio.invested.toNumber() + investmentAmt;
  const newTotalMv = userPortfolio.invested.toNumber() + investmentAmt;
  const newTotalPnl = newTotalMv - newTotalInv;
  const newTotalRoi = (newTotalPnl / newTotalInv) * 100;

  return {
    invested: newTotalInv,
    current: newTotalMv,
    pnl: newTotalPnl,
    returnPercent: newTotalRoi,
  };
};
