import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/profileDropdown.css";
import {
  UserCircle,
  UserSquare,
  GearSix,
  ChatCenteredDots,
  Warning,
  SignOut,
} from "phosphor-react";
import { motion as m, AnimatePresence } from "framer-motion";
import { Feedback } from "./feedback";
import { ReportProblem } from "./report-problem";
import { ConfirmSignOut } from "./sign-out";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReportProblem, setShowReportProblem] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFeedbackClick = () => {
    setShowFeedback(true);
    setIsOpen(false);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  const handleReportProblemClick = () => {
    setShowReportProblem(true);
    setIsOpen(false);
  };

  const handleCloseReportProblem = () => {
    setShowReportProblem(false);
  };

  const handleSignOutClick = () => {
    setShowSignOut(true);
    setIsOpen(false);
  };

  const handleCloseSignOut = () => {
    setShowSignOut(false);
  };


  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <UserCircle size={40} />
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
              <UserSquare size={30} />
              <p>Profile</p>
            </li>
            <li>
              <GearSix size={30} />
              <p>Settings</p>
            </li>
            <li onClick={handleFeedbackClick}>
              <ChatCenteredDots size={30} />
              <p>Feedback</p>
            </li>
            <li onClick={handleReportProblemClick}>
              <Warning size={30} />
              <p>Report A Problem</p>
            </li>
            <li onClick={handleSignOutClick} className="signout">
              <SignOut size={30} />
              <p>Sign Out</p>
            </li>
          </m.ul>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showFeedback && <Feedback onClose={handleCloseFeedback} />}
      </AnimatePresence>

      <AnimatePresence>
        {showReportProblem && <ReportProblem onClose={handleCloseReportProblem} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSignOut && <ConfirmSignOut onClose={handleCloseSignOut} />}
      </AnimatePresence>
    </div>
  );
};