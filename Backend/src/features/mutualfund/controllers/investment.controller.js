import { asyncHandler } from "../../../shared/utils/asyncHandler.utils.js";
import * as investmentService from "../services/investment.service.js";

export const handleInvest = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const {
    investmentAmt,
    schemeCode,
    fundName,
    latestNav,
    latestNavDate,
    fundType,
    logoCode,
    shortName,
  } = req.body;

  await investmentService.processInvestment({
    userId,
    investmentAmt,
    schemeCode,
    fundName,
    latestNav,
    latestNavDate: latestNavDate,
    fundType: fundType.toUpperCase(),
    logoCode,
    shortName,
  });

  return res.status(200).json({
    success: true,
    message: "Investment Successfull",
  });
});
