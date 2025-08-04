export const columnsConfig = {
  return_1y: {
    fullName: "1Y Return",
    shortName: "1Y",
    prefix: "",
    suffix: "%",
  },
  return_3y: {
    fullName: "3Y Returns",
    shortName: "3Y",
    prefix: "",
    suffix: "%",
  },
  return_5y: {
    fullName: "5Y Returns",
    shortName: "5Y",
    prefix: "",
    suffix: "%",
  },
  return_since_inception: {
    fullName: "All",
    shortName: "All",
    prefix: "",
    suffix: "%",
  },
  expense_ratio: {
    fullName: "Expense Ratio",
    shortName: "TER",
    prefix: "",
    suffix: "%",
  },
  aum: {
    fullName: "Fund size",
    shortName: "Fund size",
    prefix: "₹",
    suffix: "Cr",
  },
  fund_rating: {
    fullName: "Rating",
    shortName: "Rating",
    prefix: "",
    suffix: " ★",
  },
  lump_min: {
    fullName: "Min Lump.",
    shortName: "Min Lump.",
    prefix: "₹",
    suffix: "",
  },
  sip_min: {
    fullName: "Min SIP",
    shortName: "Min SIP",
    prefix: "₹",
    suffix: "",
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
