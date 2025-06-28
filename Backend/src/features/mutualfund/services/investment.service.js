import { tnxRepo, walletRepo } from "../../../shared/repositories/index.repository.js";
import { addToUserPortfolio } from "../../../shared/services/userPortfolio.service.js";
import { ApiError } from "../../../utils/apiError.utils.js";
import { holdingRepo, portfolioRepo } from "../repositories/index.repository.js";
import { calculateUpdatedPortfolio } from "../utils/investment.utils.js";

// Main Handler
export const processInvestment = async (data) => {
  const {
    userId,
    investmentAmt,
    fundCode,
    fundName,
    purchaseNav,
    fundType,
    logoCode,
    shortName,
  } = data;

  const balance = await walletRepo.checkBalance(userId);
  if (investmentAmt > balance) throw new ApiError(400, "Insufficient wallet balance");

  const purchaseUnits = investmentAmt / purchaseNav;

  const prevInv = await portfolioRepo.findUnique({
    userId_fundCode: { userId, fundCode },
  });

  // ------------------------------------------------------- Checking it's Fresh or Re investment
  if (!prevInv) {
    await portfolioRepo.create({
      userId,
      fundCode,
      fundName,
      fundType,
      units: purchaseUnits,
      current: investmentAmt,
      invested: investmentAmt,
      latestNav: purchaseNav,
      logoCode,
      shortName,
    });
  } else {
    const updatedValues = calculateUpdatedPortfolio(
      prevInv,
      investmentAmt,
      purchaseUnits
    );
    await portfolioRepo.update(
      { id: prevInv.id },
      { ...updatedValues, latestNav: purchaseNav }
    );
  }
  // --------------------------------------------------------------------------------------------

  // Below are the Common Post-investment operations for both (Fresh or Re investment)
  await holdingRepo.create({
    userId,
    fundCode,
    fundName,
    amount: investmentAmt,
    purchaseNav,
    units: purchaseUnits,
  });

  await tnxRepo.create({
    userId,
    amount: investmentAmt,
    code: fundCode,
    name: fundName,
    quantity: purchaseUnits,
    price: purchaseNav,
    assetType: "MF",
    tnxType: "BUY",
  });

  await addToUserPortfolio({ userId, investmentAmt, portfolioType: "MF" });

  await walletRepo.debitBalance(userId, investmentAmt);
};
