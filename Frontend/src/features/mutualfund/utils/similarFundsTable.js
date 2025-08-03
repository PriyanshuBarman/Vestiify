export const columnsConfig = {
  return_1y: { fullName: "1Y Returns", shortName: "1Y", suffix: "%" },
  return_3y: { fullName: "3Y Returns", shortName: "3Y", suffix: "%" },
  return_5y: { fullName: "5Y Returns", shortName: "5Y", suffix: "%" },
  return_since_inception: { fullName: "All", shortName: "All", suffix: "%" },
  fund_rating: { fullName: "Rating", shortName: "Rating", suffix: " ★" },
  expense_ratio: { fullName: "Expense Ratio", shortName: "TER", suffix: "%" },
  lump_min: { fullName: "Min Lumpsum", shortName: "Min Lump.", prefix: "₹" },
  sip_min: { fullName: "Min SIP", shortName: "Min SIP", prefix: "₹" },
  aum: {
    fullName: "Fund size",
    shortName: "Fund size",
    prefix: "₹",
    suffix: "Cr",
  },
};

export const columnKeys = Object.keys(columnsConfig);

export function getNewOrder(clicked, activeColumn, sortOrder) {
  if (activeColumn === clicked) {
    return sortOrder === "desc" ? "asc" : "desc";
  }
  return "desc";
}

export function sortPeersBy(peers, activeColumn, order) {
  return peers.toSorted((a, b) =>
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
