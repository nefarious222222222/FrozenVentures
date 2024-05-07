import React from "react";
import { easeOut, motion as m } from "framer-motion";

export const SignIn = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="sign-in"
    >
      <form action="">
        <div className="input-field">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>

        <button>Sign In</button>
      </form>
    </m.div>
  );
};
