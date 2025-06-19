import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import * as investmentService from "../services/investment.service.js";

export const handleInvest = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { investmentAmt, fundCode, fundName, purchaseNav, fundType, shortCode, shortName } = req.body;

  await investmentService.processInvestment({
    userId,
    investmentAmt,
    fundCode,
    fundName,
    purchaseNav,
    fundType: fundType.toUpperCase(),
    shortCode,
    shortName
  });

  return res.status(200).json({
    success: true,
    message: "Investment Successfull",
  });
});
