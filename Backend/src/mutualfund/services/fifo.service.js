import { holdingRepo } from "../repositories/holding.repository.js";

export const fifoRedemption = async (
  userId,
  schemeCode,
  redemptionUnits,
  tx
) => {
  const holdings = await holdingRepo.findMany({ userId, schemeCode }, tx);

  let remainingUnits = redemptionUnits;
  let costBasis = 0;

  for (const holding of holdings) {
    if (remainingUnits === 0) break;

    const holdingUnits = holding.units.toNumber();
    const holdingNav = holding.purchaseNav.toNumber();

    if (remainingUnits >= holdingUnits) {
      costBasis += holding.amount.toNumber();
      remainingUnits -= holdingUnits;

      await holdingRepo.delete({ id: holding.id }, tx);
    } else {
      await holdingRepo.update(
        { id: holding.id },
        {
          units: holding.units.toNumber() - remainingUnits,
          amount: holding.amount.toNumber() - remainingUnits * holdingNav,
        },
        tx
      );

      // Add the amount to cost basis
      costBasis += remainingUnits * holdingNav;
      remainingUnits = 0;
    }
  }

  return Math.round(costBasis);
};
