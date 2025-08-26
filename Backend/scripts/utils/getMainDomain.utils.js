export const getMainDomain = (urlString) => {
  const hostname = new URL(urlString).hostname.replace("www.", "");
  const parts = hostname.split(".");

  // remove subDomains if available
  return parts.length > 2 ? parts.slice(parts.length - 2).join(".") : hostname;
};
