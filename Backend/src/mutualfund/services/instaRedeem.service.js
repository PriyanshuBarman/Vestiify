import { TZDate } from "@date-fns/tz";
import { parse } from "date-fns";
import { db } from "../../../config/db.config.js";
import { MF_API_BASE_URL } from "../../../config/env.config.js";
import {
  tnxRepo,
  userRepo,
} from "../../shared/repositories/index.repository.js";
import { orderRepo, portfolioRepo } from "../repositories/index.repository.js";
import { calcPortfolioAfterRedemption } from "../utils/calculateUpdatedPortfolio.utils.js";
import { fifoRedemption } from "./fifo.service.js";

export const instantRedemption = async (fund, amount) => {
  const { schemeCode, userId } = fund;
  const { latestNav, latestNavDate, fundName } = fetchLatestNAVData(
    fund.schemeCode
  );

  const units = amount / latestNav; // Redemption units

  // prisma $transaction
  await db.$transaction(async (tx) => {
    const costBasis = await fifoRedemption(userId, schemeCode, units, tx);

    const updatedValues = calcPortfolioAfterRedemption(
      fund,
      costBasis,
      amount,
      units
    );

    await portfolioRepo.update(
      { userId_schemeCode: { userId, schemeCode } },
      updatedValues,
      tx
    );

    const order = await orderRepo.create(
      {
        userId,
        schemeCode,
        fundName,
        amount,
        units,
        method: "REGULAR",
        orderType: "REDEEM",
        processDate: TZDate.tz("Asia/Kolkata"),
        navDate: latestNavDate,
        status: "COMPLETE",
      },
      tx
    );

    await tnxRepo.create(
      {
        userId,
        amount,
        mfOrderId: order.id,
        tnxType: "CREDIT",
        updatedBalance: balance + amount,
      },
      tx
    );

    await userRepo.creditBalance(userId, amount, tx);
  });
};

export const fetchLatestNAVData = async (schemeCode) => {
  try {
    const { data } = await axios.get(`${MF_API_BASE_URL}/${schemeCode}/latest`);

    const latestEntry = data.data[0];
    const latestNav = parseFloat(latestEntry?.nav);
    const latestNavDate = parse(latestEntry?.date, "yyyy-MM-dd", new Date());

    return { latestNav, latestNavDate };
  } catch (error) {
    throw new Error(`Error at fetchLatestNAVData: ${error.message}`);
  }
};
