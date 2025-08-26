import { holdingRepo } from "../repositories/index.repository.js";

export const fifoRedemption = async (userId, symbol, sellQty) => {
  const holdings = await holdingRepo.findMany({userId, symbol});

  let remainingQty = sellQty;
  let costBasis = 0;

  for (const holding of holdings) {
    if (remainingQty === 0) break;

    if (remainingQty >= holding.units) {
      costBasis += holding.amount;
      remainingQty -= holding.units;
      await holdingRepo.delete(holding.id);
    } else {
      const reductionAmount = remainingQty * holding.price.toNumber();
      await holdingRepo.update(
        { id: holding.id },
        { quantity: { decrement: remainingQty }, amount: { decrement: reductionAmount } }
      );

      costBasis += remainingQty * holding.price.toNumber();
      remainingQty = 0;
    }
  }

  return Math.round(costBasis);
};
