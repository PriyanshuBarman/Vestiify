import { CrudRepository } from "../../../shared/repositories/crud.repository.js";

class PortfolioRepository extends CrudRepository {
  constructor() {
    super("mfPortfolio");
  }
}

export const portfolioRepo = new PortfolioRepository();
