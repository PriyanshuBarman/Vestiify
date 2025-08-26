import { db } from "../../../config/db.config.js";

export const walletRepo = {
  async checkBalance(userId, client = db) {
    try {
      const { balance } = await client.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      return balance.toNumber();
    } catch (error) {
      console.log(
        `❌ Error at Wallet repository - checkBalance: ${error.message}`
      );
      throw error;
    }
  },

  async creditBalance(userId, amount, client = db) {
    amount = Math.abs(amount);
    try {
      const { balance } = await client.user.update({
        where: { id: userId },
        data: {
          balance: { increment: amount },
        },
      });

      return balance.toNumber();
    } catch (error) {
      console.log(
        `❌ Error at Wallet repository - creditBalance: ${error.message}`
      );
      throw error;
    }
  },

  async debitBalance(userId, amount, client = db) {
    amount = Math.abs(amount);
    try {
      const { balance } = await client.user.update({
        where: { id: userId },
        data: {
          balance: { decrement: amount },
        },
      });

      return balance.toNumber();
    } catch (error) {
      console.log(
        `❌ Error at Wallet repository - debitBalance: ${error.message}`
      );
      throw error;
    }
  },
};
