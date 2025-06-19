import { CrudRepository } from "../../../shared/repositories/crud.repository.js";

class HoldingRepository extends CrudRepository {
  constructor() {
    super("MfHolding");
  }
}

export const holdingRepo = new HoldingRepository();
