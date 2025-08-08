export const formatPortfolio = (portfolio) => {
  const normalizeFundValues = (fund) => ({
    ...fund,
    latestNav: fund.latestNav?.toNumber(),
    units: fund.units?.toNumber(),
    invested: fund.invested?.toNumber(),
    current: fund.current?.toNumber(),
    pnl: fund.pnl?.toNumber(),
    returnPercent: fund.returnPercent?.toNumber(),
    dayChangePercent: fund.dayChangePercent?.toNumber(),
    dayChangeValue: fund.dayChangeValue?.toNumber(),
  });

  // Handle both single object and array
  return Array.isArray(portfolio)
    ? portfolio.map(normalizeFundValues)
    : normalizeFundValues(portfolio);
};
