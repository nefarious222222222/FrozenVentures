import { useState, useEffect } from "react";
import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";

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
    return userCredential;
  } catch (error) {
    console.error("ERROR signing in: ", error);
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

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

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




// FETCH FUNCTION
// Fetch user id from authentication
export const getUserIdFromAuth = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);

      } else {
        setUserId(null);
      }
    });
    return unsubscribe;
  }, []);
  return userId;
};

// Fetch email from auth
export const getEmailByUid = async (uid) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      return email;
    } else {
      throw new Error("No user is currently signed in");
    }
  } catch (error) {
    console.error("Error fetching email:", error);
    throw error;
  }
};