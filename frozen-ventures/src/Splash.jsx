import React, { useContext, useState, useEffect } from "react";
import "./assets/styles/splash.css";
import Logo from "./assets/images/logo.jpg";
import { UserContext } from "./context/user-context";
import { WhisperSpinner } from "react-spinners-kit";
import { easeInOut, motion as m } from "framer-motion";

export const Splash = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (user.userRole == "Admin") {
        setTimeout(() => {
          window.location.href = "/admin";
        }, 3000);
      } else if (user.userRole == "Retailer") {
        setTimeout(() => {
          window.location.href = "/home-retailer";
        }, 3000);
      } else {
        setTimeout(() => {
          window.location.href = "/home";
        }, 3000);
      }
    } catch {
      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);
    }
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="loading"
    >
      
      <div className="header">
        <img src={Logo} />
        <p>FrozenVentures</p>
      </div>
      <WhisperSpinner
        size={200}
        color="#533d70"
        frontColor="#533d70"
        backColor="#533d70"
        loading={loading}
      />
    </m.div>
  );
};
