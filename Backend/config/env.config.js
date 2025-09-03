export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const EXTERNAL_API_BASE_URL = process.env.EXTERNAL_API_BASE_URL;
export const MF_HELPER_API_BASE_URL = process.env.MF_HELPER_API_BASE_URL;
export const MF_API_BASE_URL = process.env.MF_API_BASE_URL;

[
  ["JWT_SECRET", JWT_SECRET],
  ["CLIENT_ID", CLIENT_ID],
  ["CLIENT_SECRET", CLIENT_SECRET],
  ["NODE_ENV", NODE_ENV],
  ["FRONTEND_URL", FRONTEND_URL],
  ["EXTERNAL_API_BASE_URL", EXTERNAL_API_BASE_URL],
  ["MF_HELPER_API_BASE_URL", MF_HELPER_API_BASE_URL],
  ["MF_API_BASE_URL", MF_API_BASE_URL],
].forEach(([key, value]) => {
  if (!value && NODE_ENV !== "cron")
    throw new Error(`${key} is not defined in environment variables!`);
});
