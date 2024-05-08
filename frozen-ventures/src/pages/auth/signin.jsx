import React from "react";
import { easeInOut, easeOut, motion as m } from "framer-motion";
import { GoogleLogo } from "phosphor-react";

export const SignIn = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="sign-in"
    >
      <form action="">
        <div className="input-field">
          <label htmlFor="phoneEmail">Phone or Email:</label>
          <input type="text" id="phoneEmail" name="phoneEmail"/>
        </div>

        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password"/>
        </div>

        <div className="button-container">
          <button>Sign In</button>
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
