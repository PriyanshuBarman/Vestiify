import { db } from "../../config/db.config.js";
import { fetchNAVData, navCache } from "../utils/fetchNAVData.js";
import { parseDDMMYYYY } from "../utils/parseDDMMYYYY.js";
import { getYesterdayISTDateObj } from "../utils/getYesterdayISTDateObj.js";

export const mfPortfolioUpdater = async () => {
  console.log("⏳ MF Portfolio Updater Started...");
  navCache.clear();

  const yesterday = getYesterdayISTDateObj();
  const portfolios = await db.mfPortfolio.findMany({
    where: {
      latestNavDate: {
        lt: yesterday,
      },
    },
  });

  const batchSize = 50;
  for (let i = 0; i < portfolios.length; i += batchSize) {
    const batch = portfolios.slice(i, i + batchSize);

    await Promise.allSettled(
      batch.map(async (fund) => {
        try {
          await updateFund(fund);
        } catch (err) {
          console.error(`❌ Failed: ${fund.schemeCode}`, { error: err.message });
        }
      })
    );
  }

  console.log("✅ MF Portfolio Updater Finished.");
};

// ====================================================================================

async function updateFund(fund) {
  // 1. Fetch latest NAV from API
  const navInfo = await fetchNAVData(fund.schemeCode);

  const apiNavDate = parseDDMMYYYY(navInfo.latestNavDate);
  const prevNav = fund.latestNav.toNumber();

  // 2. Get stored NAV date from DB (assume fund.latestNavDate is ISO string)
  const dbNavDate = new Date(fund.latestNavDate);

  // 3. If NavDate not changed(i.e. no new NAV), skip update
  if (apiNavDate <= dbNavDate) return;

  // 4. Proceed with update logic...
  const units = fund.units.toNumber();
  const invested = fund.invested.toNumber();

  const current = units * navInfo.latestNav;
  const pnl = current - invested;
  const returnPercent = (pnl / invested) * 100;
  const dayChangeValue = current - fund.current.toNumber();
  const dayChangePercent = (dayChangeValue / fund.current.toNumber()) * 100;

  await db.mfPortfolio.update({
    where: { id: fund.id },
    data: {
      current,
      pnl,
      returnPercent,
      latestNav: navInfo.latestNav,
      latestNavDate: apiNavDate,
      dayChangeValue,
      dayChangePercent,
    },
  });
}
