import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../utils/apiError.utils.js";
import { userRepo } from "../../user/repositories/user.repository.js";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = "7d";

export const signupUser = async (name, email, password) => {
  const existingUser = await userRepo.findUnique({ email });

  if (existingUser) throw new ApiError(400, "User Already Exists");

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepo.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return token;
};

export const loginUser = async (email, password) => {
  const existingUser = await userRepo.findUnique({ email });

  if (!existingUser) throw new ApiError(400, "Email or password is invalid");

  const match = await bcrypt.compare(password, existingUser.password);

  if (!match) throw new ApiError(400, "Email or password is invalid");

  const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return token;
};
