import { db } from "../../../config/db.config.js";
import { CrudRepository } from "../../shared/repositories/crud.repository.js";

class PortfolioRepository extends CrudRepository {
  constructor() {
    super("mfPortfolio");
  }

  async getPortfolioSummary(userId) {
    return await db.mfPortfolio.aggregate({
      where: { userId },
      _sum: {
        current: true,
        invested: true,
        pnl: true,
        returnPercent: true,
        dayChangeValue: true,
        dayChangePercent: true,
      },
    });
  }
}

export const portfolioRepo = new PortfolioRepository();
