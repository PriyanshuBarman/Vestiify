export const columnLabels = {
  year_1: { fullName: "1Y Returns", shortName: "1Y" },
  year_3: { fullName: "3Y Returns", shortName: "3Y" },
  year_5: { fullName: "5Y Returns", shortName: "5Y" },
};

export const columnKeys = Object.keys(columnLabels);
export const unit = {
  year_1: "%",
  year_3: "%",
  year_5: "%",
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
