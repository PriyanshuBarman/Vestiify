import {
  profileRepo,
  userRepo,
} from "../../shared/repositories/index.repository.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const fetchProfile = async (userId) => {
  const user = await userRepo.findUnique(
    { id: userId },
    {
      select: {
        email: true,
        hasPin: true,
        createdAt: true,
        profile: true,
      },
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const searchProfile = async (userId, query, limit) => {
  return await profileRepo.findMany(
    {
      AND: [
        {
          OR: [
            { fullName: { contains: query } },
            { username: { contains: query } },
          ],
        },
        { userId: { not: userId } },
      ],
    },
    {
      take: parseInt(limit || 8),
    }
  );
};
