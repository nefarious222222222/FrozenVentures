export function validateContactNumber(contact) {
  const startsWith09 = /^09/.test(contact);
  return startsWith09 && !isNaN(contact) && contact.length === 11;
}

export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  const containsUppercase = /[A-Z]/.test(password);
  const containsSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLengthValid = password.length >= 6;
  
  return containsUppercase && containsSymbol && isLengthValid;
}

export function validateImage(file) {
  if (!file) {
    return false;
  }

  const supportedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const isValidType = supportedTypes.includes(file.type);

  const maxSizeMB = 10;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const isValidSize = file.size <= maxSizeBytes;

  return isValidType && isValidSize;
}
