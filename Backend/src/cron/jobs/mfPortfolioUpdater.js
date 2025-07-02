import { db } from "../../config/db.config.js";
import { clearNavCache, fetchNAVData } from "../utils/fetchNAVData.js";

const failedFunds = [];

export const mfPortfolioUpdater = async () => {
  console.log("⏳ MF Portfolio Updater Started...");
  clearNavCache();

  const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const portfolios = await db.mfPortfolio.findMany({
    where: {
      latestNavDate: {
        lt: new Date(yesterdayStr),
      },
    },
  });

  console.log(portfolios);

  for (const fund of portfolios) {
    try {
      await updateFund(fund);
    } catch (err) {
      failedFunds.push(fund);
      console.error(` Failed: ${fund.fundCode}`, { error: err.message });
    }
  }

  // Retry failed ones once
  if (failedFunds.length) {
    await retryFailFunds();
  }

  console.log("✅ MF Portfolio Updater Finished.");
};

// ====================================================================================

async function updateFund(fund) {
  const { latestNav, prevNav, latestNavDate } = await fetchNAVData(fund.fundCode);

  const units = fund.units.toNumber();
  const invested = fund.invested;

  const current = units * latestNav;
  const pnl = current - invested;
  const returnPercent = (pnl / invested) * 100;
  const dayChangeValue = units * (latestNav - prevNav);
  const dayChangePercent = ((latestNav - prevNav) / prevNav) * 100;

  await db.mfPortfolio.update({
    where: { id: fund.id },
    data: {
      current,
      pnl,
      returnPercent,
      latestNav,
      latestNavDate: new Date(latestNavDate),
      dayChangeValue,
      dayChangePercent,
    },
  });
}

async function retryFailFunds() {
  console.log(`🔁 Retrying ${failedFunds.length} failed fund updates...`);
  for (const fund of failedFunds) {
    try {
      await updateFund(fund);
      console.log(`Retry success: ${fund.fundCode}`);
    } catch (err) {
      console.error(`Retry failed: ${fund.fundCode}`, { error: err.message });
    }
  }
}
