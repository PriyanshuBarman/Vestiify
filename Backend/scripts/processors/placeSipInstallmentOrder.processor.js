import { addMonths } from "date-fns";
import { db } from "../../config/db.config.js";
import {
  tnxRepo,
  walletRepo,
} from "../../src/shared/repositories/index.repository.js";
import {
  sipRepo,
  orderRepo,
} from "../../src/mutualfund/repositories/index.repository.js";
import { getNavAndProcessDateForSip } from "../utils/getNavAndProcessDateForSip.utils.js";

export const placeSipInstallmentOrder = async (data) => {
  const {
    userId,
    id: sipId,
    amount,
    schemeCode,
    fundName,
    fundCategory,
    nextInstallmentDate,
  } = data;

  const balance = await walletRepo.checkBalance(userId);
  if (amount > balance) {
    await orderRepo.create({
      userId,
      amount,
      schemeCode,
      fundName,
      processDate,
      navDate,
      method: "SIP",
      orderType: "SIP_INSTALLMENT",
      sipId,
      status: "FAILED",
      failureReason: "Insufficient wallet balance",
    });
    console.log("Insufficient wallet balance");
    return;
  }

  const { processDate, navDate } = getNavAndProcessDateForSip(
    nextInstallmentDate,
    fundCategory
  );

  // prisma $transaction
  await db.$transaction(async (tx) => {
    const order = await orderRepo.create(
      {
        userId,
        amount,
        schemeCode,
        fundName,
        processDate,
        navDate,
        method: "SIP",
        orderType: "SIP_INSTALLMENT",
        sipId: sipId,
      },
      tx
    );

    const updatedBalance = await walletRepo.debitBalance(userId, amount, tx);

    await tnxRepo.create(
      {
        userId,
        amount,
        mfOrderId: order.id,
        tnxType: "DEBIT",
        updatedBalance,
      },
      tx
    );

    // Update next installmentDate
    await sipRepo.update(
      { id: sipId },
      { nextInstallmentDate: addMonths(nextInstallmentDate, 1) },
      tx
    );
  });
};
