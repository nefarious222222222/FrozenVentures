import React, { useState, useRef, useEffect } from "react";
import "../../assets/styles/user-menu.css";
import {
  UserSquare,
  GearSix,
  Warning,
  SignOut,
} from "phosphor-react";
import { Navigate } from "react-router-dom";
import { motion as m, AnimatePresence, easeInOut } from "framer-motion";
import { Profile } from "./profile/profile";
import { Settings } from "./settings/settings";
import { ReportProblem } from "../../components/report-problem";
import { ConfirmSignOut } from "../../components/sign-out";
import { useAuth } from "../../context/auth-context";

export const UserMenu = () => {
  const { userSignedIn } = useAuth();
  const [activeItem, setActiveItem] = useState("profile");
  const [showReportProblem, setShowReportProblem] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const reportProblemRef = useRef(null);
  const signOutRef = useRef(null);

  const handleProfileClick = () => {
    setActiveItem("profile");
    setShowReportProblem(false);
    setShowSignOut(false);
  };

  const handleSettingsClick = () => {
    setActiveItem("settings");
    setShowReportProblem(false);
    setShowSignOut(false);
  };

  const handleReportProblemClick = () => {
    setShowReportProblem(true);
    setShowSignOut(false);
  };

  const handleCloseReportProblem = () => {
    setShowReportProblem(false);
  };

  const handleSignOutClick = () => {
    setShowSignOut(true);
    setShowReportProblem(false);
  };

  const handleCloseSignOut = () => {
    setShowSignOut(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        reportProblemRef.current && !reportProblemRef.current.contains(event.target)
      ) {
        handleCloseReportProblem();
      }
      if (signOutRef.current && !signOutRef.current.contains(event.target)) {
        handleCloseSignOut();
      }
    };

    if (showReportProblem || showSignOut) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReportProblem, showSignOut]);

  return (
    <m.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container user-menu"
    >
      {!userSignedIn ? <Navigate to={"/home"} replace={true} /> : null}
      <div className="menu">
        <div className="list-container">
          <ul>
            <li
              onClick={handleProfileClick}
              className={activeItem === "profile" ? "active" : ""}
            >
              <UserSquare size={30} />
              <p>Profile</p>
            </li>

            <li
              onClick={handleSettingsClick}
              className={activeItem === "settings" ? "active" : ""}
            >
              <GearSix size={30} />
              <p>Settings</p>
            </li>

            <li
              onClick={handleReportProblemClick}
              className={showReportProblem ? "active" : ""}
            >
              <Warning size={30} />
              <p>Report A Problem</p>
            </li>

            <li
              className={`signout ${showSignOut ? "active" : ""}`}
              onClick={handleSignOutClick}
            >
              <SignOut size={30} />
              <p>Sign Out</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="selected-item">
        <AnimatePresence>
          {activeItem === "profile" && <Profile />}
        </AnimatePresence>
        <AnimatePresence>
          {activeItem === "settings" && <Settings />}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showReportProblem && (
          <div ref={reportProblemRef}>
            <ReportProblem onClose={handleCloseReportProblem} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSignOut && (
          <div ref={signOutRef}>
            <ConfirmSignOut onClose={handleCloseSignOut} />
          </div>
        )}
      </AnimatePresence>
    </m.div>
  );
};