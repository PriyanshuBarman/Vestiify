import cron from "node-cron";
import { updateAllMfPortfolio } from "./jobs/mfPortfolioUpdater.js";

const scheduleCronJob = (scheduleTime) => {
  return cron.schedule(
    scheduleTime,
    async () => {
      try {
        await updateAllMfPortfolio();
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

scheduleCronJob("30 22 * * *"); // Runs every day at 10:30 PM IST
scheduleCronJob("0 23 * * *"); // Runs every day at 11:00 PM IST
scheduleCronJob("30 23 * * *"); // Runs every day at 11:30 PM IST
scheduleCronJob("0 0 * * *"); // Runs every day at 12:00 AM IST
scheduleCronJob("30 0 * * *"); // Runs every day at 12:30 AM IST
scheduleCronJob("0 1 * * *"); // Runs every day at 1:00 AM IST
scheduleCronJob("30 1 * * *"); // Runs every day at 1:30 AM IST
scheduleCronJob("0 2 * * *"); // Runs every day at 2:00 AM IST
scheduleCronJob("30 2 * * *"); // Runs every day at 2:30 AM IST

// cron.schedule(
//   "30 21 * * *",
//   async () => {
//     try {
//       await updateAllMfPortfolio();
//     } catch (err) {
//       console.error("❌ [CronRunner] Job failed :", {
//         error: err.message,
//         timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//       });
//     }
//   },

//   { timezone: "Asia/Kolkata" }
// );
