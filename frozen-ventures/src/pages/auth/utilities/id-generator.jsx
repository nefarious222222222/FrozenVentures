export function IdGenerator(latestUserId) {
  const currentYear = new Date().getFullYear();
  const yearPart = currentYear.toString();
  const lastFourDigits = parseInt(latestUserId.slice(-4)); // Extract last four digits
  const newLastFourDigits = (lastFourDigits + 1).toString().padStart(4, "0"); // Increment and pad
  const userID = yearPart + "-" + newLastFourDigits; // Construct new userID
  return userID;
}
