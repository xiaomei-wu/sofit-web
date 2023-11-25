export const isTokenExpired = (
  tokenPayload: { iat: number },
  expirationHours: number
): boolean => {
  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const expirationTime = tokenPayload.iat + expirationHours * 3600; // Add expiration hours in seconds

  return now > expirationTime;
};
