import { CrudRepository } from "./crud.repository.js";

class UserPortfolioRepository extends CrudRepository {
  constructor() {
    super("userPortfolio");
  }
}

export const userPortfolioRepo = new UserPortfolioRepository();
