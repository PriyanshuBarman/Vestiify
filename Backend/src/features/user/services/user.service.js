import { ApiError } from "../../../shared/utils/apiError.utils.js";
import { userRepo } from "../repositories/user.repository.js";

export const fetchUser = async (userId) => {
  const user = await userRepo.findUnique(
    { id: userId },
    { select: { name: true, email: true, avatar: true, balance: true } }
  );

  if (!user) throw new ApiError(404, "User not found");

  return user;
};
