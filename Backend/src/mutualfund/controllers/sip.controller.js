import { ApiError } from "../../shared/utils/apiError.utils.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as sipService from "../services/sip.service.js";

export const startSip = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { amount, fundName, fundCategory, schemeCode, dateOfMonth } = req.body;

  await sipService.startSip({
    userId,
    amount,
    fundName,
    fundCategory,
    schemeCode,
    dateOfMonth,
  });

  res.status(200).json({ success: true, message: "SIP started successfully" });
});

export const editSip = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sipId, amount, dateOfMonth } = req.body;

  if (!sipId || sipId === "") {
    throw new ApiError(400, "sipId is required");
  }
  if (!amount || !dateOfMonth) {
    throw new ApiError(400, "amount or dateOfMonth one is required");
  }

  await sipService.editSip({
    userId,
    sipId,
    amount,
    dateOfMonth,
  });

  res.status(200).json({ success: true, message: "SIP edit request placed" });
});

export const skipSip = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { sipId } = req.params;

  if (!sipId || sipId === "") {
    throw new ApiError(400, `sipId is required`);
  }

  await sipService.skipSip(userId, sipId);

  res.status(200).json({ success: true, message: "SIP Skipped Successfully" });
});

export const getAllSips = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const result = await sipService.getAllSips(userId);

  res.status(200).json({ success: true, result });
});
