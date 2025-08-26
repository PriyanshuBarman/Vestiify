import { tnxRepo } from "../../shared/repositories/index.repository.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const fetchAllTnx = async (userId) => {
  const tnx = await tnxRepo.findMany(
    { userId },
    { orderBy: { createdAt: "desc" } }
  );

  if (!tnx.length) throw new ApiError(404, "No transactions found");

  return tnx;
};
