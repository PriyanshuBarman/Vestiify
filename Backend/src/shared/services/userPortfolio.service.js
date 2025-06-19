import {
  calculatePortfolioAfterBuy,
  calculatePortfolioAfterSell,
} from "../../utils/userPortfolio.utils.js";
import { userPortfolioRepo } from "../repositories/index.repository.js";

export const addToUserPortfolio = async ({ userId, investmentAmt, portfolioType }) => {
  const userPortfolio = await userPortfolioRepo.findUnique({
    userId_portfolioType: { userId, portfolioType },
  });

  // If First Investment, CREATE userPortfolio else UPDATE existing userPortfolio
  if (!userPortfolio) {
    await userPortfolioRepo.create({
      userId,
      portfolioType,
      totalMv: investmentAmt,
      totalInv: investmentAmt,
    });
  } else {
    await userPortfolioRepo.update(
      { id: userPortfolio.id },
      calculatePortfolioAfterBuy(userPortfolio, investmentAmt)
    );
  }
};


// prettier-ignore
export const subtractUserPortfolio = async ({userId,amount,portfolioType,costBasis = null}) => {
  const userPortfolio = await userPortfolioRepo.findUnique({
    userId_portfolioType: { userId, portfolioType },
  });
  
  // If Last Redemption/Sell, DELETE userPortfolio else UPDATE existing userPortfolio
  if (amount === userPortfolio.totalMv.toNumber()) {
     await userPortfolioRepo.delete({ id: userPortfolio.id });
  } else {
    await userPortfolioRepo.update(
      { id: userPortfolio.id },
      calculatePortfolioAfterSell(userPortfolio, amount, costBasis)
    );
  }

};
