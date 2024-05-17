export function IdGenerator(latestUserId) {
  const currentYear = new Date().getFullYear();
  const yearPart = currentYear.toString();
  const lastFourDigits = parseInt(latestUserId.slice(-4));
  const newLastFourDigits = (lastFourDigits + 1).toString().padStart(4, "0");
  const userID = yearPart + "-" + newLastFourDigits;
  return userID;
}