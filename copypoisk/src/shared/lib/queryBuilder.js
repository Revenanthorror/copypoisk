export const getQueryParams = (params = {}) => {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
  );
  return new URLSearchParams(filtered).toString();
};