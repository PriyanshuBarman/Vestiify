export const columnLabels = {
  one_year_return: { fullName: "1Y Returns", shortName: "1Y" },
  three_year_return: { fullName: "3Y Returns", shortName: "3Y" },
  ter: { fullName: "Expense Ratio", shortName: "TER" },
  // rating: { fullName: "Rating", shortName: "Rating" },
};

export const columnKeys = Object.keys(columnLabels);
export const unit = {
  rating: "⭐",
  ter: "%",
  one_year_return: "%",
  three_year_return: "%",
};

export const getNewOrder = (clicked, activeColumn, sortOrder) => {
  if (activeColumn === clicked) {
    return sortOrder === "desc" ? "asc" : "desc";
  }
  return clicked === "ter" ? "asc" : "desc";
};

export const sortPeersBy = (peers, activeColumn, order) => {
  return [...peers].sort((a, b) =>
    order === "asc" ? a[activeColumn] - b[activeColumn] : b[activeColumn] - a[activeColumn],
  );
};

// For Mobile (Loop)
export function getNextColumn(activeColumn) {
  const currentIndex = columnKeys.indexOf(activeColumn);
  const nextIndex = (currentIndex + 1) % columnKeys.length;
  return columnKeys[nextIndex];
}
