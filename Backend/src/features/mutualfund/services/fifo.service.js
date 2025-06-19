import { holdingRepo } from "../repositories/index.repository.js";

export const fifoRedemption = async (userId, fundCode, redemptionUnits) => {
  const holdings = await holdingRepo.findMany({ userId, fundCode });

  let remainingUnits = redemptionUnits;
  let costBasis = 0;

  for (const holding of holdings) {
    if (remainingUnits === 0) break;

    const holdingUnits = holding.units.toNumber();
    const holdingNav = holding.purchaseNav.toNumber();

    if (remainingUnits >= holdingUnits) {
      costBasis += holding.amount;
      remainingUnits -= holdingUnits;

      await holdingRepo.delete({ id: holding.id });
    } else {
      await holdingRepo.update(
        { id: holding.id },
        {
          units: holding.units.toNumber() - remainingUnits,
          amount: holding.amount.toNumber() - remainingUnits * holdingNav,
        }
      );

      // Add the amount to cost basis
      costBasis += remainingUnits * holdingNav;
      remainingUnits = 0;
    }
  }

  return Math.round(costBasis);
};
