import cron from "node-cron";
import { mfPortfolioUpdater } from "./jobs/mfPortfolioUpdater.js";

const scheduleMfPortfolioUpdate = (scheduleTime) => {
  return cron.schedule(
    scheduleTime,
    async () => {
      try {
        await mfPortfolioUpdater();
      } catch (err) {
        console.error("❌ [CronRunner] Job failed :", {
          error: err.message,
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });
      }
    },
    { timezone: "Asia/Kolkata" }
  );
};

scheduleMfPortfolioUpdate("0 22 * * *"); // Runs every day at 10:00 PM IST
scheduleMfPortfolioUpdate("5 0 * * *"); // Runs every day at 12:05 AM IST
scheduleMfPortfolioUpdate("30 0 * * *"); // Runs every day at 12:30 AM IST
scheduleMfPortfolioUpdate("0 1 * * *"); // Runs every day at 1:00 AM IST
