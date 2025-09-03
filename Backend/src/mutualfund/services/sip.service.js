import { tz } from "@date-fns/tz";
import { addDays, addMonths, differenceInDays } from "date-fns";
import { ApiError } from "../../shared/utils/apiError.utils.js";
import { pendingSipChangeRepo } from "../repositories/pendingSipChange.repository.js";
import { sipRepo } from "../repositories/sip.repository.js";
import { getNextInstallmentDate } from "../utils/getNextInstallmentDate.utils.js";
import * as orderService from "./order.service.js";
import { getMainDomain } from "../utils/getMainDomain.utils.js";

export const createSip = async ({
  userId,
  amount,
  sipDate,
  schemeCode,
  fundName,
  shortName, // required for order placement
  fundCategory,
  fundHouseDomain,
  fundType, // required for order placement
}) => {
  //1. create/subscribe to new SIP
  const { id: sipId } = await sipRepo.create({
    userId,
    amount,
    sipDate,
    schemeCode,
    fundName,
    shortName,
    fundType: fundType.toUpperCase(),
    fundCategory,
    fundHouseDomain: getMainDomain(fundHouseDomain),
    nextInstallmentDate: getNextInstallmentDate(sipDate),
  });

  //2. place initial investment order
  await orderService.placeInvestmentOrder({
    sipId,
    userId,
    amount,
    fundName,
    shortName, //
    fundCategory,
    schemeCode,
    fundHouseDomain,
    fundType: fundType.toUpperCase(), //
  });
};

export const editSip = async ({ userId, sipId, amount, sipDate }) => {
  // Fetch the current SIP
  const sip = await sipRepo.findUnique({ id: sipId, userId });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  if (amount === sip.amount && sipDate === sip.sipDate) {
    throw new ApiError(400, "No changes detected");
  }

  const diffDays = differenceInDays(sip.nextInstallmentDate, new Date(), {
    in: tz("Asia/Kolkata"),
  });

  // If next installment is more than 2 days away, update directly
  if (diffDays > 2) {
    return await sipRepo.update(
      { id: sipId },
      {
        amount,
        sipDate,
        nextInstallmentDate: getNextInstallmentDate(sipDate),
      }
    );
  }

  // Otherwise, update or create a pending change
  await pendingSipChangeRepo.upsert(
    { userId_sipId: { userId, sipId } },
    {
      amount,
      sipDate,
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    },
    {
      userId,
      sipId,
      amount,
      sipDate,
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    }
  );
};

export const skipSip = async (userId, sipId) => {
  const sip = await sipRepo.findUnique({ id: sipId, userId });
  if (!sip) {
    throw new ApiError(404, "SIP not found");
  }

  const diffDays = differenceInDays(sip.nextInstallmentDate, new Date(), {
    in: tz("Asia/Kolkata"),
  });

  // If next installment is more than 2 days away, update directly
  if (diffDays > 2) {
    return await sipRepo.update(
      { id: sipId },
      {
        nextInstallmentDate: addMonths(sip.nextInstallmentDate, 1),
      }
    );
  }

  // Otherwise, update or create a pending change
  await pendingSipChangeRepo.upsert(
    { userId_sipId: { userId, sipId } },
    {
      nextInstallmentDate: addMonths(sip.nextInstallmentDate, 1),
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    },
    {
      userId,
      sipId,
      nextInstallmentDate: addMonths(sip.nextInstallmentDate, 1),
      applyDate: addDays(sip.nextInstallmentDate, 1), // apply the changes after the next installment
    }
  );
};

export const getAllSips = async (userId) => {
  const allSips = await sipRepo.findMany({ userId });
  const activeSipAmount = await sipRepo.getTotalActiveSipAmountByUser(userId);

  if (!allSips.length) {
    throw new ApiError(404, "No Active SIP's Found");
  }

  return {
    totalActiveSipAmount: activeSipAmount._sum.amount,
    allSips,
  };
};
