import { db } from "../../../config/db.config.js";
import { CrudRepository } from "../../shared/repositories/crud.repository.js";

class SipRepository extends CrudRepository {
  constructor() {
    super("mfSip");
  }

  async getTotalActiveSipAmountByUser(userId) {
    return await db.mfSip.aggregate({
      where: { userId },
      _sum: { amount: true },
    });
  }
}

export const sipRepo = new SipRepository();
