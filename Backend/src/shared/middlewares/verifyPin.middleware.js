import { userRepo } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.utils.js";
import bcrypt from "bcrypt";

export const verifyPin = async (req, res, next) => {
  try {
    const { pin } = req.body;
    const { userId } = req.user;

    if (!pin) {
      throw new ApiError(400, "Pin is required");
    }

    const user = await userRepo.findUnique(
      { id: userId },
      { select: { pin: true } }
    );

    const isMatched = await bcrypt.compare(pin, user.pin);

    if (!isMatched) {
      throw new ApiError(400, "Invalid Pin");
    }

    next();
  } catch (error) {
    next(error);
  }
};
