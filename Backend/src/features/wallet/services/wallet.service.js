import { tnxRepo, walletRepo } from "../../../shared/repositories/index.repository.js";

export const fetchBalance = async (userId) => {
  return await walletRepo.checkBalance(userId);
};

export const depositBalance = async (userId, amount) => {
  await walletRepo.creditBalance(userId, amount);
  await tnxRepo.create({
    userId,
    amount,
    tnxType: "DEPOSIT",
  });
};
