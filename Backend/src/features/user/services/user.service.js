import { userRepo } from "../repositories/user.repository.js";

export const fetchUser = async (userId) => {
  const user = await userRepo.findUnique(
    { id: userId },
    { select: { name: true, email: true, avatar: true, balance: true } }
  );

  return user;
};
