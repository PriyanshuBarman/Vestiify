import { CrudRepository } from "../../../shared/repositories/crud.repository.js";

class HoldingRepository extends CrudRepository {
  constructor() {
    super("mfHolding");
  }
}

export const holdingRepo = new HoldingRepository();
