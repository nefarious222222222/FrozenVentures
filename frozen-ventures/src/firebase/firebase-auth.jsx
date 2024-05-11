import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { getUserByEmailAndPassword } from "./firebase-operations";
import { setCurrentUser,clearCurrentUser } from "../pages/auth/utilities/session";

// Create an account to firebase authentication
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in account using firebase authentiation and create session
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = await getUserByEmailAndPassword(email, password);
    if (userId) {
      setCurrentUser(userId);
      console.log("User Signed In:", userId);
    }
    return userCredential;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

// Sign in with google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

// Sign out
export const doSignOut = () => {
  clearCurrentUser();
  console.log("User has signed out");
  return auth.signOut();
};


// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// Send an email verification to user's email
export const doSendEmailVerification = () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return sendEmailVerification(currentUser, {
      url: `${window.location.origin}/`,
    });
  } else {
    console.error("No user is currently signed in.");
    return Promise.reject("No user is currently signed in.");
  }
};

// Deletes the user account by email and password
export const doDeleteUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await deleteUser(user);
    console.log("User account deleted successfully", email);
  } catch (error) {
    console.error("Error deleting user account: ", error);
    throw error;
  }
};
