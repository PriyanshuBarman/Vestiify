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

scheduleMfPortfolioUpdate("0 2 * * *"); // Runs everyday at 2:00 AM IST
scheduleMfPortfolioUpdate("0 3 * * *"); // Runs everyday at 3:00 AM IST
scheduleMfPortfolioUpdate("0 4 * * *"); // Runs everyday at 4:00 AM IST
