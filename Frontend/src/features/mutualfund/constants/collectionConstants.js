import { VITE_MF_API_BASE_URL } from "@/config/env";

export const collectionConfig = {
  "High Returns": {
    url: `${VITE_MF_API_BASE_URL}?plan=Growth&sort_by=return_1y&category=Equity`,
    description: "Funds with highest returns in the last 1 years.",
  },
  "Gold Funds": {
    url: `${VITE_MF_API_BASE_URL}?plan=Growth&sort_by=return_1y&category=debt`,
  },
  "5 Star Funds": {
    url: `${VITE_MF_API_BASE_URL}?plan=Growth&sort_by=return_1y&fund_rating=5`,
    description: "Funds rated 5 stars by Value Research.",
  },
  "Large Cap": {
    url: `${VITE_MF_API_BASE_URL}?plan=Growth&sort_by=return_1y&category=Equity&fund_category=Large%20Cap%20Fund`,
    description: "Funds with majority investments in large cap companies.",
  },
  "Mid Cap": {
    url: `${VITE_MF_API_BASE_URL}?plan=Growth&sort_by=return_1y&category=Equity&fund_category=Mid%20Cap%20Fund`,
    description: "Funds with majority investments in mid cap companies.",
  },
  "Small Cap": {
    url: `${VITE_MF_API_BASE_URL}?plan=Growth&sort_by=return_1y&category=Equity&fund_category=Small%20Cap%20Fund`,
    description: "Funds with majority investments in small cap companies.",
  },
};
