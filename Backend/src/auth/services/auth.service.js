import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../shared/utils/apiError.utils.js";

import crypto from "crypto";
import { db } from "../../../config/db.config.js";
import { JWT_SECRET } from "../../../config/env.config.js";
import { TOKEN_EXPIRY } from "../constants/auth.constants.js";

export const signupUser = async (fullName, email, password) => {
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) throw new ApiError(400, "User Already Exists");

  const hashPassword = await bcrypt.hash(password, 10);
  const username = await generateUniqueUsername(fullName);

  const user = await db.user.create({
    data: {
      email,
      password: hashPassword,
      profile: {
        create: {
          fullName,
          username,
        },
      },
    },
  });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return { token, user };
};

export const loginUser = async (email, password) => {
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser) throw new ApiError(400, "Email or password is invalid");

  const match = await bcrypt.compare(password, existingUser.password);

  if (!match) throw new ApiError(400, "Email or password is invalid");

  const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return { token, user: existingUser };
};

export const setPin = async (userId, pin) => {
  const hashPin = await bcrypt.hash(pin.toString(), 10);

  await db.user.update({
    where: { id: userId },
    data: {
      pin: hashPin,
      hasPin: true,
    },
  });
};

export async function generateUniqueUsername(fullName) {
  const base = fullName.toLowerCase().replace(/\s+/g, "");
  let username = base;

  // First check if base username is available
  const exists = await db.profile.findUnique({
    where: { username },
  });

  if (!exists) return username;

  // Keep generating until we find a available username
  while (true) {
    // Generate 5 random candidates/usernames in a batch
    const candidates = Array.from(
      { length: 5 },
      () => base + crypto.randomInt(1, 1000) // 4-digit random
    );

    // Fetch all usernames that already exist from this batch
    const taken = await db.profile.findMany({
      where: { username: { in: candidates } },
      select: {
        username: true,
      },
    });

    // Find the first candidate not taken
    const available = candidates.find(
      (u) => !taken.some((t) => t.username === u)
    );

    if (available) {
      return available;
    }

    // If all taken, loop again and try another batch
  }
}
