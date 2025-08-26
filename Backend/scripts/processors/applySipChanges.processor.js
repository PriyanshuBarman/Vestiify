import { db } from "../../config/db.config.js";
import {
  pendingSipChangeRepo,
  sipRepo,
} from "../repositories/index.repository.js";

export const applySipChanges = async (data) => {
  const { id, sipId, amount, dateOfMonth, nextInstallmentDate } = data;

  await db.$transaction(async (tx) => {
    await sipRepo.update(
      { id: sipId },
      {
        amount: amount || undefined,
        dateOfMonth: dateOfMonth || undefined,
        nextInstallmentDate: nextInstallmentDate || undefined,
      },
      tx
    );

    await pendingSipChangeRepo.delete({ id }, tx);
  });
};
