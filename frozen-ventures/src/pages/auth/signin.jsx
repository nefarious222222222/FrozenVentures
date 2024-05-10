import React, { useState, useEffect } from "react";
import "../../firebase/firebase-config";
import { easeInOut, motion as m, AnimatePresence } from "framer-motion";
import { GoogleLogo } from "phosphor-react";
import { validateUser } from "../../firebase/firebase-operations";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

export const SignIn = () => {
  const [phoneEmail, setPhoneEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(errorTimeout);
  }, [error]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!phoneEmail || !password) {
      setError("Please enter both email/phone and password.");
      return;
    }

    const db = getFirestore();
    const userId = await validateUser(phoneEmail, password);
    if (userId) {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const userRole = userData && userData.role;
          if (userRole) {
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("userRole", userRole);
            window.location.href = "/";
          } else {
            console.error("User role not found.");
          }
        } else {
          console.error("Document does not exist.");
        }
      } catch (error) {
        console.error("Error updating isSignedIn field:", error);
      }
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="sign-in"
    >
      <form onSubmit={handleSignIn}>
        <AnimatePresence>
          {error && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="error-container"
            >
              <m.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: easeInOut }}
                className="alert-error"
              >
                <p>{error}</p>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
        <div className="input-field">
          <label htmlFor="phoneEmail">Phone or Email:</label>
          <input
            type="text"
            id="phoneEmail"
            name="phoneEmail"
            value={phoneEmail}
            onChange={(e) => setPhoneEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button type="submit">Sign In</button>
          <a href="">Forgot password?</a>
        </div>
      </form>

      <div className="sign-google">
        <div className="google-text">
          <div></div>
          <p>Or sign in with</p>
          <div></div>
        </div>

        <GoogleLogo size={32} weight="bold" />
      </div>
    </m.div>
  );
};
