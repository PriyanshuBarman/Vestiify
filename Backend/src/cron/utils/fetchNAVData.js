import axios from "axios";
import { EXTERNAL_API_BASE_URL } from "../../config/env.config.js";

const navCache = new Map();

export const fetchNAVData = async (fundCode) => {
  if (navCache.has(fundCode)) return navCache.get(fundCode);

  const { data } = await axios.get(
    `${EXTERNAL_API_BASE_URL}/mf/api/v5/fund_schemes/${fundCode}.json`
  );

  console.log("Latest Nav: ", data[0].nav); // Testing (will be removed)

  const latestNav = data[0].nav.nav;
  const prevNav = data[0].last_nav.nav;
  const latestNavDate = data[0].nav.date;

  const navInfo = { latestNav, prevNav, latestNavDate };
  navCache.set(fundCode, navInfo);

  return navInfo;
};

export const clearNavCache = () => {
  navCache.clear();
};
