export function sortPortfolio(portfolio, columnKey, orderBy) {
  const sortedPortfolio = portfolio.toSorted((a, b) => {
    return orderBy === "asc"
      ? a[columnKey] - b[columnKey]
      : b[columnKey] - a[columnKey];
  });

  return sortedPortfolio;
}
