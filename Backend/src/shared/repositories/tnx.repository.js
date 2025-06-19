import { CrudRepository } from "./crud.repository.js";

class TnxRepository extends CrudRepository {
  constructor() {
    super("transaction");
  }
}

export const tnxRepo = new TnxRepository();
