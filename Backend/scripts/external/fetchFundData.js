import axios from "axios";
import { MF_HELPER_API_BASE_URL } from "../../config/env.config.js";

const fundDataCache = new Map();

export const fetchFundData = async (schemeCode) => {
  try {
    if (fundDataCache.has(schemeCode)) {
      return fundDataCache.get(schemeCode);
    }

    const { data } = await axios.get(
      `${MF_HELPER_API_BASE_URL}/scheme_code/${schemeCode}`
    );

    if (!data) {
      throw new Error(
        `Error at fetchFundData: fundData not found for schemeCode${schemeCode}`
      );
    }

    fundDataCache.set(schemeCode, data.fund);
    return data.fund;
  } catch (error) {
    throw new Error(`Error at fetchFundData: ${error}`);
  }
};
