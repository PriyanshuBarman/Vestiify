import axios from "axios";

export const navCache = new Map();

export const fetchNAVData = async (schemeCode) => {
  if (navCache.has(schemeCode)) return navCache.get(schemeCode);

  try {
    const { data } = await axios.get(`https://api.mfapi.in/mf/${schemeCode}/latest`);

    const latestEntry = data.data[0];
    const latestNav = parseFloat(latestEntry.nav);
    const latestNavDate = latestEntry.date;

    const navInfo = { latestNav, latestNavDate };
    navCache.set(schemeCode, navInfo);

    return navInfo;
  } catch (error) {
    throw new Error(`Error at fetchNAVData: ${error.message}`);
  }
};
