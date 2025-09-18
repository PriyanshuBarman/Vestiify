import { ApiError } from "../../shared/utils/apiError.utils.js";
import {
  tnxRepo,
  userRepo,
} from "../../shared/repositories/index.repository.js";
import { isBefore, isToday } from "date-fns";
import { tz, TZDate } from "@date-fns/tz";
import { db } from "../../../config/db.config.js";

export const fetchUser = async (userId) => {
  const user = await userRepo.findUnique(
    { id: userId },
    {
      select: {
        name: true,
        email: true,
        avatar: true,
        balance: true,
        pin: true,
        createdAt: true,
      },
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const dailyReward = async (userId) => {
  const user = await userRepo.findUnique({ id: userId });

  if (!user) throw new ApiError(404, "User not found");

  if (
    user.lastRewardedAt &&
    isToday(user.lastRewardedAt, { in: tz("Asia/Kolkata") })
  ) {
    throw new ApiError(400, "Already rewarded today");
  }

  const rewardAmount = 1000;
  const updatedBalance = await db.$transaction(async (tx) => {
    const { balance: updatedBalance } = await userRepo.update(
      { id: userId },
      {
        balance: { increment: rewardAmount },
        lastRewardedAt: TZDate.tz("Asia/Kolkata"),
      },
      tx
    );

    await tnxRepo.create(
      {
        userId,
        amount: rewardAmount,
        type: "CREDIT",
        updatedBalance,
        peerUserId: "system",
      },
      tx
    );

    return updatedBalance;
  });

  return updatedBalance.toNumber();
};

export const search = async (query, limit) => {
  return await userRepo.findMany(
    {
      OR: [{ name: { contains: query } }, { username: { contains: query } }],
    },
    {
      select: {
        name: true,
        username: true,
        avatar: true,
      },

      take: parseInt(limit),
    }
  );
};
