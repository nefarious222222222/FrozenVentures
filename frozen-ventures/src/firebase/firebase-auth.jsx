import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// Create an account to firebase authentication
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("ERROR creating user: ", error);
    throw error;
  }
};

// Sign in account using firebase authentiation and create session
export const doSignInWithEmailAndPassword = async (email, password, setError) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("ERROR signing in: ", error);
    setError("Incorrect Credentials");
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
  console.log("User has signed out");
  return auth.signOut();
};

// Send an email verification to user's email
export const doSendEmailVerification = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    if (!currentUser.emailVerified) {
      try {
        await sendEmailVerification(currentUser);
        console.log("Verification email sent successfully.");
      } catch (error) {
        console.error("ERROR sending verification email:", error);
        throw error;
      }
    } else {
      console.warn("Email is already verified.");
      return Promise.resolve();
    }
  } else {
    console.error("No user is currently signed in.");
    return Promise.reject("No user is currently signed in.");
  }
};
