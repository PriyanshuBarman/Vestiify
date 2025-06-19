import { db } from "../../config/db.config.js";

export const walletRepo = {
  async checkBalance(userId) {
    try {
      const { balance } = await db.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });
      return balance;
    } catch (error) {
      console.log(
        `♾️Error occurred at Wallet repository - checkBalance method: ${error.message}`
      );
      throw error;
    }
  },

  async creditBalance(userId, amount) {
    amount = Math.abs(amount);
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          balance: { increment: amount },
        },
      });
    } catch (error) {
      console.log(
        `♾️Error occurred at Wallet repository - checkBalance method: ${error.message}`
      );
    }
  },

  async debitBalance(userId, amount) {
    amount = Math.abs(amount);
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          balance: { decrement: amount },
        },
      });
    } catch (error) {
      console.log(
        `♾️Error occurred at Wallet repository - checkBalance method: ${error.message}`
      );
    }
  },
};
