import { CrudRepository } from "../../../shared/repositories/crud.repository.js";

class HoldingRepository extends CrudRepository {
  constructor() {
    super("stockHolding");
  }
}

export const holdingRepo = new HoldingRepository();
