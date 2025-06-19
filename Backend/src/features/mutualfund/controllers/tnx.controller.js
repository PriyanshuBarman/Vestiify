import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import * as tnxService from "../services/tnx.service.js";

export const getPortfolioTnx = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const tnx = await tnxService.fetchPortfolioTnx(userId);

  return res.status(200).json({ success: true, tnx });
});


export const getFundTnx = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { fundCode } = req.params;

  const tnx = await tnxService.fetchFundTnx(userId, fundCode);

  return res.status(200).json({ success: true, tnx });
});
