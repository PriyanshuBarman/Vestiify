import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as tnxService from "../services/transaction.service.js";

export const getAllTnx = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const transactions = await tnxService.fetchAllTnx(userId);

  return res.status(200).json({ success: true, transactions });
});
