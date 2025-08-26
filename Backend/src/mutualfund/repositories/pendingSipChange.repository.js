import { db } from "../../../config/db.config.js";
import { CrudRepository } from "../../shared/repositories/crud.repository.js";

class PendingSipChangeRepository extends CrudRepository {
  constructor() {
    super("pendingSipChange");
  }

  async upsert(where, update, create, client = db) {
    return await client.pendingSipChange.upsert({
      where,
      update,
      create,
    });
  }
}

export const pendingSipChangeRepo = new PendingSipChangeRepository();
