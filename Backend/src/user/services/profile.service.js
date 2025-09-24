import { profileRepo } from "../../shared/repositories/index.repository.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

export const fetchProfile = async (userId) => {
  const profile = await profileRepo.findUnique({ userId });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
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
      ],
    },
    {
      take: parseInt(limit || 8),
    }
  );
};
