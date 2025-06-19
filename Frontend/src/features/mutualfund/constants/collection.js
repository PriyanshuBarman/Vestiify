const baseURL = import.meta.env.VITE_EXTERNAL_MF_API_URL + "/insight/api/v1/mutual_fund_search.json?limit=40";

export const collectionConfig = {
  "High Returns": {
    url: `${baseURL}&sort_by=one_year_return&order_by=desc&scheme_plan=GROWTH&category=Equity`,
    description: "Funds with highest returns in the last 1 years.",
  },
  "Gold Funds": {
    url: `${baseURL}&sort_by=rating&order_by=desc&scheme_plan=GROWTH&category=debt`,
  },
  "5 Star Funds": {
    url: `${baseURL}&sort_by=rating&order_by=desc&scheme_plan=GROWTH&category=Equity&rating=5`,
    description: "Funds rated 5 stars by Value Research.",
  },
  "Large Cap": {
    url: `${baseURL}&sort_by=rating&order_by=desc&scheme_plan=GROWTH&category=Equity&sub_category=Large%20Cap%20Fund`,
    description: "Funds with majority investments in large cap companies.",
  },
  "Mid Cap": {
    url: `${baseURL}&sort_by=rating&order_by=desc&scheme_plan=GROWTH&category=Equity&sub_category=Mid%20Cap%20Fund`,
    description: "Funds with majority investments in mid cap companies.",
  },
  "Small Cap": {
    url: `${baseURL}&sort_by=rating&order_by=desc&scheme_plan=GROWTH&category=Equity&sub_category=Small%20Cap%20Fund`,
    description: "Funds with majority investments in small cap companies.",
  },
};
