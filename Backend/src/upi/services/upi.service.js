import { formatDate } from "date-fns";
import { db } from "../../../config/db.config.js";
import {
  profileRepo,
  tnxRepo,
  userRepo,
} from "../../shared/repositories/index.repository.js";

export const fetchBalance = async (userId) => {
  return await userRepo.checkBalance(userId);
};

export const sendMoney = async (userId, amount, note, receiverUsername) => {
  const balance = await userRepo.checkBalance(userId);
  if (amount > balance) {
    throw new ApiError(400, "Insufficient wallet balance");
  }

  const { userId: receiverId } = await profileRepo.findUnique(
    { username: receiverUsername },
    { select: { userId: true } }
  );
  if (!receiverId) {
    throw new ApiError(404, "Receiver not found");
  }

  return await db.$transaction(async (tx) => {
    const userUpdatedBalance = await userRepo.debitBalance(userId, amount, tx);
    const receiverUpdatedBalance = await userRepo.creditBalance(
      receiverId,
      amount,
      tx
    );

    // create transaction history for sender and receiver
    await tnxRepo.createMany(
      [
        {
          userId,
          amount,
          note,
          type: "DEBIT",
          updatedBalance: userUpdatedBalance,
          peerUserId: receiverId,
        },
        {
          userId: receiverId,
          amount,
          type: "CREDIT",
          updatedBalance: receiverUpdatedBalance,
          peerUserId: userId,
        },
      ],
      tx
    );

    return userUpdatedBalance;
  });
};

export const fetchAllTnx = async (userId) => {
  const tnx = await tnxRepo.findMany(
    { userId },
    {
      include: {
        peerUser: {
          select: {
            profile: true,
          },
        },
        assetOrder: true,
      },
      orderBy: { createdAt: "desc" },
    }
  );

  if (!tnx.length) {
    throw new ApiError(404, "No transactions found");
  }

  // Group transactions by month (YYYY-MM) and calculate summary
  const grouped = tnx.reduce((acc, transaction) => {
    const monthKey = formatDate(transaction.createdAt, "MMMM yy");

    // Find if month already exists
    let monthGroup = acc.find((m) => m.month === monthKey);

    if (!monthGroup) {
      monthGroup = { month: monthKey, transactions: [], summary: 0 };
      acc.push(monthGroup);
    }

    // Push transaction
    monthGroup.transactions.push(transaction);

    // Update summary
    if (transaction.type === "DEBIT") {
      monthGroup.summary -= transaction.amount.toNumber();
    } else if (transaction.type === "CREDIT") {
      monthGroup.summary += transaction.amount.toNumber();
    }

    return acc;
  }, []);

  return grouped;
};
