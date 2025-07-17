export const columnLabels = {
  return_1y: { fullName: "1Y Returns", shortName: "1Y" },
  return_3y: { fullName: "3Y Returns", shortName: "3Y" },
  return_5y: { fullName: "5Y Returns", shortName: "5Y" },
  aum: { fullName: "Fund Size", shortName: "AUM" },
  expense_ratio: { fullName: "Expense Ratio", shortName: "TER" },
};

export const columnKeys = Object.keys(columnLabels);

export const getNewOrder = (clicked, activeColumn, sortOrder) => {
  if (activeColumn === clicked) {
    return sortOrder === "desc" ? "asc" : "desc";
  }
  return clicked === "expense_ratio" ? "asc" : "desc";
};

export const sortPeersBy = (peers, activeColumn, order) =>
  [...peers].sort((a, b) => (order === "asc" ? a[activeColumn] - b[activeColumn] : b[activeColumn] - a[activeColumn]));

// For Mobile (Loop)
export function getNextColumn(activeColumn) {
  const currentIndex = columnKeys.indexOf(activeColumn);
  const nextIndex = (currentIndex + 1) % columnKeys.length;
  return columnKeys[nextIndex];
}
