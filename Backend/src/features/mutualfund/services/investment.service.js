import { tnxRepo, walletRepo } from "../../../shared/repositories/index.repository.js";
import { ApiError } from "../../../shared/utils/apiError.utils.js";
import { holdingRepo, portfolioRepo } from "../repositories/index.repository.js";
import { calculateUpdatedPortfolio } from "../utils/investment.utils.js";

// Main Handler
export const processInvestment = async (data) => {
  const {
    userId,
    investmentAmt,
    schemeCode,
    fundName,
    latestNav,
    latestNavDate,
    fundType,
    logoCode,
    shortName,
  } = data;

  const balance = await walletRepo.checkBalance(userId);
  if (investmentAmt > balance) throw new ApiError(400, "Insufficient wallet balance");

  const purchaseUnits = investmentAmt / latestNav;

  const prevInv = await portfolioRepo.findUnique({
    userId_schemeCode: { userId, schemeCode },
  });

  // ------------------------------------------------------- Checking it's Fresh or Re investment
  if (!prevInv) {
    await portfolioRepo.create({
      userId,
      schemeCode,
      fundName,
      fundType,
      units: purchaseUnits,
      current: investmentAmt,
      invested: investmentAmt,
      latestNav,
      latestNavDate,
      logoCode,
      shortName,
    });
  } else {
    const updatedValues = calculateUpdatedPortfolio(prevInv, investmentAmt, purchaseUnits);
    await portfolioRepo.update({ id: prevInv.id }, { ...updatedValues, latestNav, latestNavDate });
  }
  // --------------------------------------------------------------------------------------------
  // Below are the Common Post-investment operations for both (Fresh or Re investment)
  await holdingRepo.create({
    userId,
    schemeCode,
    fundName,
    amount: investmentAmt,
    units: purchaseUnits,
    purchaseNav: latestNav,
  });

  await tnxRepo.create({
    userId,
    amount: investmentAmt,
    code: schemeCode.toString(),
    name: fundName,
    quantity: purchaseUnits,
    price: latestNav,
    assetType: "MF",
    tnxType: "BUY",
  });

  await walletRepo.debitBalance(userId, investmentAmt);
};
