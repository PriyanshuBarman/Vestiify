export const columnLabels = {
  return_1y: { fullName: "1Y Returns", shortName: "1Y" },
  return_3y: { fullName: "3Y Returns", shortName: "3Y" },
  return_5y: { fullName: "5Y Returns", shortName: "5Y" },
};

export const columnKeys = Object.keys(columnLabels);
export const unit = {
  return_1y: "%",
  return_3y: "%",
  return_5y: "%",
};

export function getNewOrder(clicked, activeColumn, sortOrder) {
  if (activeColumn === clicked) {
    return sortOrder === "desc" ? "asc" : "desc";
  }
  return clicked === "ter" ? "asc" : "desc";
}

export function sortPeersBy(peers, activeColumn, order) {
  return [...peers].sort((a, b) =>
    order === "asc"
      ? a[activeColumn] - b[activeColumn]
      : b[activeColumn] - a[activeColumn],
  );
}

// For Mobile (Loop)
export function getNextColumn(activeColumn) {
  const currentIndex = columnKeys.indexOf(activeColumn);
  const nextIndex = (currentIndex + 1) % columnKeys.length;
  return columnKeys[nextIndex];
}
