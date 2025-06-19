import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import * as tnxService from "../services/tnx.service.js";

export const getAllTnx = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const tnx = await tnxService.fetchAllTnx(userId);

  return res.status(200).json({ success: true, tnx });
});
