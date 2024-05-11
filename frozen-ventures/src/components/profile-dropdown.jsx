import React, { useState } from "react";
import "../assets/styles/profileDropdown.css";
import {
  UserCircle,
  GearSix,
  ChatCenteredDots,
  Warning,
  SignOut,
} from "phosphor-react";
import { motion as m, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/firebase-auth";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate("/sign");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropdown}>
        <img src="" alt="asd" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.ul
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.5 }}
          >
            <li>
              <UserCircle size={30} />
              <p>Profile</p>
            </li>
            <li>
              <GearSix size={30} />
              <p>Settings</p>
            </li>
            <li>
              <ChatCenteredDots size={30} />
              <p>Feedback</p>
            </li>
            <li>
              <Warning size={30} />
              <p>Report A Problem</p>
            </li>
            <li onClick={handleSignOut} className="signout">
              <SignOut size={30} />
              <p>Sign Out</p>
            </li>
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
