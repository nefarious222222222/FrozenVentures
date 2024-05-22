import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user-context";
import { easeInOut, motion as m, AnimatePresence } from "framer-motion";
import { GoogleLogo } from "phosphor-react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/firebase-auth";
import {
  getUserIdByEmailAndPassword,
  getUserRoleByEmailAndPassword,
  getShopNameByEmailAndPassword,
} from "../../firebase/firebase-users";

export const SignIn = () => {
  const { addUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 1500);

    return () => clearTimeout(errorTimeout);
  }, [error]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      if (!email) {
        setError("Email is required");
        return;
      } else if (!password) {
        setError("Password is required");
        return;
      }
  
      setIsSigningIn(true);
      try {
        const userId = await getUserIdByEmailAndPassword(email, password);
        const userRole = await getUserRoleByEmailAndPassword(email, password);
        const userShopName = await getShopNameByEmailAndPassword(email, password);
        addUser(userId, userRole, userShopName);
        try {
          await doSignInWithEmailAndPassword(email, password, setError);
        } catch (error) {
          console.log(error);
          setIsSigningIn(false);
          setError("Cannot find account");
        }
      } catch (error) {
        console.log(error.message);
        setIsSigningIn(false);
        setError("Incorrect credentials");
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        console.log(error);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="sign-in"
    >
      <form onSubmit={onSubmit}>
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
          <label htmlFor="phoneEmail">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" disabled={isSigningIn}>
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
          <a href="">Forgot password?</a>
        </div>
      </form>

      <div className="sign-google">
        <div className="google-text">
          <div></div>
          <p>Or sign in with</p>
          <div></div>
        </div>

        <button onClick={onGoogleSignIn} disabled={isSigningIn}>
          <GoogleLogo size={32} weight="bold" />
          <p>Google</p>
        </button>
      </div>
    </m.div>
  );
};
