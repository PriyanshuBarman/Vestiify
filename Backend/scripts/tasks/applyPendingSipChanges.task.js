import { db } from "../../config/db.config.js";
import { pendingSipChangeRepo } from "../../src/features/mutualfund/repositories/index.repository.js";
import { applySipChanges } from "../processors/applySipChanges.processor.js";
import { printSummary } from "../utils/printSummary.utils.js";

export async function applySipChangess() {
  const pendingChanges = await pendingSipChangeRepo.findMany();

  if (!pendingChanges.length) {
    return console.log("No more pending SIP changes to apply");
  }

  let failureCount = 0;
  let successCount = 0;
  const BATCH_SIZE = 4;

  for (let i = 0; i < pendingChanges.length; i += BATCH_SIZE) {
    const batch = pendingChanges.slice(i, i + BATCH_SIZE);

    await Promise.allSettled(
      batch.map(async (sip) => {
        try {
          await applySipChanges(sip);
          successCount++;
        } catch (error) {
          failureCount++;
          console.error("❌", error.message);
        }
      })
    );
  }

  printSummary(pendingChanges.length, successCount, failureCount);
}

applySipChangess()
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
