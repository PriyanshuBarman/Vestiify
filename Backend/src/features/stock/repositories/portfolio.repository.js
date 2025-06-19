import { CrudRepository } from "../../../shared/repositories/crud.repository.js";

class PortfolioRepository extends CrudRepository {
  constructor() {
    super("stockPortfolio");
  }
}

export const portfolioRepo = new PortfolioRepository();
