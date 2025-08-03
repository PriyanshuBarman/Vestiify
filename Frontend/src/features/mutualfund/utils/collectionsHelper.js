export const columnsConfig = {
  return_1y: { fullName: "1Y Returns", shortName: "1Y", suffix: "%" },
  return_3y: { fullName: "3Y Returns", shortName: "3Y", suffix: "%" },
  return_5y: { fullName: "5Y Returns", shortName: "5Y", suffix: "%" },
  return_since_inception: { fullName: "All", shortName: "All", suffix: "%" },
  fund_rating: { fullName: "Rating", shortName: "Rating", suffix: " ★" },
  expense_ratio: { fullName: "Expense Ratio", shortName: "TER", suffix: "%" },
  aum: {
    fullName: "Fund size",
    shortName: "Fund size",
    prefix: "₹",
    suffix: "Cr",
  },
  lump_min: { fullName: "Min Lumpsum", shortName: "Min Lump.", prefix: "₹" },
  sip_min: { fullName: "Min SIP", shortName: "Min SIP", prefix: "₹" },
};

export const columnKeys = Object.keys(columnsConfig);

export function getNewOrder(clicked, columnKey, orderBy) {
  if (columnKey === clicked) {
    return orderBy === "desc" ? "asc" : "desc";
  }
  return clicked === "expense_ratio" ? "asc" : "desc";
}

export function sortPeersBy(peers, columnKey, orderBy) {
  return peers.toSorted((a, b) =>
    orderBy === "asc"
      ? a[columnKey] - b[columnKey]
      : b[columnKey] - a[columnKey],
  );
}

// For Mobile (Loop)
export function getNextColumn(columnKey) {
  const currentIndex = columnKeys.indexOf(columnKey);
  const nextIndex = (currentIndex + 1) % columnKeys.length;
  return columnKeys[nextIndex];
}
