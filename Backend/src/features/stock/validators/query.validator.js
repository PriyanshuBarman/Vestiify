export const validateQuery = (req, res, next) => {
  const { sort_by, order_by } = req.query;

  const validSortOptions = ["investedAmt", "marketValue", "pnl", "roi", "updatedAt"];
  const validOrderOptions = ["asc", "desc"];

  if (sort_by && !validSortOptions.includes(sort_by)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid sort_by value", validSortOptions });
  }
  
  if (order_by && !validOrderOptions.includes(order_by)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid order_by value", validOrderOptions });
  }

  next();
};
