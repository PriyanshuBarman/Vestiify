import { tz } from "@date-fns/tz";
import { startOfToday } from "date-fns";
import { portfolioRepo } from "../../src/mutualfund/repositories/index.repository.js";
import { navCache } from "../external/fetchLatestNAVData.js";
import { updateFundPortfolio } from "../processors/portfolioUpdater.processor.js";
import { printSummary } from "../utils/printSummary.utils.js";
import { db } from "../../config/db.config.js";

export const portfolioUpdater = async () => {
  navCache.clear();

  const portfolios = await portfolioRepo.findMany({
    updatedAt: {
      lte: startOfToday({
        in: tz("Asia/Kolkata"),
      }),
    },
  });

  if (!portfolios.length) {
    return console.log("No portfolios to update.");
  }

  let updatedCount = 0;
  let failedCount = 0;
  const BATCH_SIZE = 50;

  for (let i = 0; i < portfolios.length; i += BATCH_SIZE) {
    const batch = portfolios.slice(i, i + BATCH_SIZE);

    await Promise.allSettled(
      batch.map(async (fund) => {
        try {
          await updateFundPortfolio(fund);
          updatedCount++;
        } catch (error) {
          failedCount++;
          console.error(`❌ Failed: ${fund.schemeCode}`, {
            error: error.message,
          });
        }
      })
    );
  }

  printSummary(portfolios.length, updatedCount, failedCount);
};

portfolioUpdater()
  .then(() => {
    console.log("✅ Task completed");
  })
  .catch((error) => {
    console.error("❌ Task failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
    process.exit();
  });
