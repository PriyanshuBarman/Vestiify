import {
  tnxRepo,
  userRepo,
} from "../../shared/repositories/index.repository.js";

export const fetchBalance = async (userId) => {
  return await userRepo.checkBalance(userId);
};

export const depositBalance = async (userId, amount) => {
  await userRepo.creditBalance(userId, amount);
  await tnxRepo.create({
    userId,
    amount,
    tnxType: "DEPOSIT",
  });
};
