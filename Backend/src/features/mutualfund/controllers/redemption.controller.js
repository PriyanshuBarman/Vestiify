import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import * as redemptionService from "../services/redemption.service.js";

export const fullRedemption = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { fundCode } = req.params;

  await redemptionService.fullRedemption(userId, fundCode);

  return res
    .status(200)
    .json({ success: true, message: "All units redeemed successfully" });
});


export const partialRedemption = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { fundCode } = req.params;
  const { redemptionAmt } = req.body;

  await redemptionService.partialRedemption(userId, fundCode, redemptionAmt);

  return res.status(200).json({ success: true, message: "Redemption successful" });
});
