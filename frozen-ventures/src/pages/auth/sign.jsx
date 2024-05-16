import React, { useState, useEffect } from "react";
import "../../assets/styles/sign.css";
import "../../firebase/firebase-config";
import Logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { SignIn } from "./signin";
import { SignUp } from "./signup";
import { easeInOut, motion as m } from "framer-motion";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export const Sign = () => {
  const { userSignedIn } = useAuth();

  const [showSignIn, setShowSignIn] = useState(true);
  const [activeButton, setActiveButton] = useState("signIn");

  const handleSignInClick = () => {
    setShowSignIn(true);
    setActiveButton("signIn");
  };

  const handleSignUpClick = () => {
    setShowSignIn(false);
    setActiveButton("signUp");
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container sign"
    >
      {userSignedIn ? <Navigate to={"/"} replace={true} /> : null}
      <div className="sign-container">
        <header>
          <Link to="/">
            <div className="title">
              <img src={Logo} alt="Logo" />
              <h1>FrozenVentures</h1>
            </div>
          </Link>

          <div className="button-container">
            <button
              className={activeButton === "signIn" ? "active" : ""}
              onClick={handleSignInClick}
            >
              SIGN IN
            </button>
            <button
              className={activeButton === "signUp" ? "active" : ""}
              onClick={handleSignUpClick}
            >
              SIGN UP
            </button>
          </div>
        </header>

        {showSignIn ? <SignIn /> : <SignUp />}
      </div>
    </m.div>
  );
};
