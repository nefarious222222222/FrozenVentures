let currentUser = null;

export function setCurrentUser(userId) {
  currentUser = userId;
}

export function getCurrentUser() {
  return currentUser;
}

export function clearCurrentUser() {
  currentUser = null;
}