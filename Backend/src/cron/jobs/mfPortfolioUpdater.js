import axios from "axios";
import { db } from "../../config/db.config.js";

const navCache = new Map();

const fetchNAVData = async (fundCode) => {
  if (navCache.has(fundCode)) return navCache.get(fundCode);

  const { data } = await axios.get(
    `${process.env.EXTERNAL_API_BASE_URL}/mf/api/v5/fund_schemes/${fundCode}.json`
  );

  console.log("Latest Nav: ", data[0].nav); // Testing (will be removed)
  console.log("Prev Nav: ", data[0].last_nav); // Testing (will be removed)

  const latestNav = data[0].nav.nav;
  const prevNav = data[0].last_nav.nav;

  const navInfo = { latestNav, prevNav };
  navCache.set(fundCode, navInfo);

  return navInfo;
};

export const updateAllMfPortfolio = async () => {
  console.log("⏳ MF Portfolio Updater Started...");

  navCache.clear();

  const portfolios = await db.mfPortfolio.findMany();
  const failedFunds = [];

  for (const fund of portfolios) {
    const units = fund.units.toNumber();
    const invested = fund.invested;

    try {
      const { latestNav, prevNav } = await fetchNAVData(fund.fundCode);

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
          dayChangeValue,
          dayChangePercent,
        },
      });
    } catch (err) {
      failedFunds.push(fund);
      console.error(`❌ Failed: ${fund.fundCode}`, {
        error: err.message,
        timestamp: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      });
    }
  }

  // Retry failed ones once
  if (failedFunds.length) {
    console.log(`🔁 Retrying ${failedFunds.length} failed fund updates...`);

    for (const fund of failedFunds) {
      const units = fund.units.toNumber();
      const invested = fund.invested;

      try {
        const { latestNav, prevNav } = await fetchNAVData(fund.fundCode);

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
            dayChangeValue,
            dayChangePercent,
          },
        });

        console.log(`✅ Retry success: ${fund.fundCode}`);
      } catch (err) {
        console.error(`❌ Retry failed: ${fund.fundCode}`, {
          error: err.message,
          timestamp: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        });
      }
    }
  }

  console.log("✅ MF Portfolio Updater Finished.");
};
