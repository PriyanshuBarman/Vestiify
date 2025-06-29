import { fifoRedemption } from "./fifo.service.js";
import { ApiError } from "../../../utils/apiError.utils.js";
import { walletRepo, tnxRepo } from "../../../shared/repositories/index.repository.js";
import { subtractUserPortfolio } from "../../../shared/services/userPortfolio.service.js";
import { holdingRepo, portfolioRepo } from "../repositories/index.repository.js";
import { calculateUpdatedPortfolio } from "../utils/redemption.utils.js";

export const fullRedemption = async (userId, fundCode) => {
  const fund = await portfolioRepo.findUnique({
    userId_fundCode: { userId, fundCode },
  });

  if (!fund) throw new ApiError(400, "Not invested in this fund");

  const redemptionAmt = fund.current.toNumber();
  const redemptionUnits = fund.units.toNumber();

  await portfolioRepo.delete({ id: fund.id });

  await holdingRepo.deleteMany({ userId, fundCode });

  await subtractUserPortfolio({ userId, amount: redemptionAmt, portfolioType: "MF" });

  await postRedemptionOperations(userId, fund, redemptionAmt, redemptionUnits); // helper
};


export const partialRedemption = async (userId, fundCode, redemptionAmt) => {
  const fund = await portfolioRepo.findUnique({
    userId_fundCode: { userId, fundCode },
  });

  // ------------------------------------------------------------------------------ Validations
  if (!fund) throw new ApiError(400, "Not invested in this fund");

  if (redemptionAmt > fund.current.toNumber())
    throw new ApiError(400, "Insufficient fund balance");

  if (redemptionAmt === fund.current.toNumber()) return fullRedemption(userId, fundCode);
  // ------------------------------------------------------------------------------// Validations

  const redemptionUnits = redemptionAmt / fund.latestNav.toNumber();
  const costBasis = await fifoRedemption(userId, fundCode, redemptionUnits);

  await portfolioRepo.update(
    { userId_fundCode: { userId, fundCode } },
    calculateUpdatedPortfolio(fund, costBasis, redemptionAmt, redemptionUnits)
  );

  await subtractUserPortfolio({
    userId,
    costBasis,
    amount: redemptionAmt,
    portfolioType: "MF",
  }); // shared

  await postRedemptionOperations(userId, fund, redemptionAmt, redemptionUnits); // helper
};

// it's a helper fnc that's called in both of the above fnc
const postRedemptionOperations = async (userId, fund, redemptionAmt, redemptionUnits) => {
  await tnxRepo.create({
    userId,
    amount: redemptionAmt,
    code: fund.fundCode,
    name: fund.fundName,
    quantity: redemptionUnits,
    price: fund.latestNav.toNumber(),
    assetType: "MF",
    tnxType: "SELL",
  });

  await walletRepo.creditBalance(userId, redemptionAmt);
};
