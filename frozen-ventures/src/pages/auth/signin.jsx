import React, { useState, useEffect } from "react";
import { easeInOut, motion as m, AnimatePresence } from "framer-motion";
import { GoogleLogo } from "phosphor-react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/firebase-auth";
import { useAuth } from "../../context/auth-context";
import { Navigate } from "react-router-dom";

export const SignIn = () => {
  const userSignedIn = useAuth();

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
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error.message);
        setIsSigningIn(false);

        if (!email) {
          setError("Email is required");
        } else if (!password) {
          setError("Password is required");
        } else {
          setError("Incorrect Credentials");
        }
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="sign-in"
    >
      {userSignedIn && <Navigate to={"/"} replace={true} />}
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
