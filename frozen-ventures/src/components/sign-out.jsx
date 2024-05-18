import React, { useContext } from "react";
import "../assets/styles/sign-out.css"
import { UserContext } from "../context/user-context";
import { X } from "phosphor-react";
import { doSignOut } from "../firebase/firebase-auth";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ConfirmSignOut = ({ onClose }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await doSignOut();
      localStorage.removeItem('orderedItems');
      localStorage.removeItem('cartItems');
      clearUser();
      navigate("/sign");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="sign-out"
    >
      <X className="x-button" size={32} onClick={handleCancel} />
      <div className="header">
        <h2>Sign Out</h2>
        <p>Are you certain you wish to sign out?</p>
      </div>

      <div className="buttons">
        <button onClick={handleSignOut}>Yes</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </m.div>
  );
};