import { fifoRedemption } from "./fifo.service.js";
import { ApiError } from "../../../shared/utils/apiError.utils.js";
import { walletRepo, tnxRepo } from "../../../shared/repositories/index.repository.js";
import { holdingRepo, portfolioRepo } from "../repositories/index.repository.js";
import { calculateUpdatedPortfolio } from "../utils/redemption.utils.js";

export const fullRedemption = async (userId, schemeCode) => {
  const fund = await portfolioRepo.findUnique({
    userId_schemeCode: { userId, schemeCode },
  });

  if (!fund) throw new ApiError(400, "Not invested in this fund");

  const redemptionAmt = fund.current.toNumber();
  const redemptionUnits = fund.units.toNumber();

  await portfolioRepo.delete({ id: fund.id });

  await holdingRepo.deleteMany({ userId, schemeCode });

  await postRedemptionOperations(userId, fund, redemptionAmt, redemptionUnits); // helper
};

export const partialRedemption = async (userId, schemeCode, redemptionAmt) => {
  const fund = await portfolioRepo.findUnique({
    userId_schemeCode: { userId, schemeCode },
  });

  // ------------------------------------------------------------------------------ Validations
  if (!fund) throw new ApiError(400, "Not invested in this fund");

  if (redemptionAmt > fund.current.toNumber()) throw new ApiError(400, "Insufficient fund balance");

  if (redemptionAmt === fund.current.toNumber()) return fullRedemption(userId, schemeCode);
  // ------------------------------------------------------------------------------// Validations

  const redemptionUnits = redemptionAmt / fund.latestNav.toNumber();
  const costBasis = await fifoRedemption(userId, schemeCode, redemptionUnits);

  await portfolioRepo.update(
    { userId_schemeCode: { userId, schemeCode } },
    calculateUpdatedPortfolio(fund, costBasis, redemptionAmt, redemptionUnits)
  );

  await postRedemptionOperations(userId, fund, redemptionAmt, redemptionUnits); // helper
};

// it's a helper fnc that's called in both of the above fnc
const postRedemptionOperations = async (userId, fund, redemptionAmt, redemptionUnits) => {
  await tnxRepo.create({
    userId,
    amount: redemptionAmt,
    code: fund.schemeCode.toString(),
    name: fund.fundName,
    quantity: redemptionUnits,
    price: fund.latestNav.toNumber(),
    assetType: "MF",
    tnxType: "SELL",
  });

  await walletRepo.creditBalance(userId, redemptionAmt);
};
