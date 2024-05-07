import React from "react";
import { easeInOut, easeOut, motion as m } from "framer-motion";

export const SignUp = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="sign-up"
    >
      signup
    </m.div>
  );
};
