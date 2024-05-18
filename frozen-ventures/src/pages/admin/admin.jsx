import React, { useContext } from "react";
import "../../assets/styles/admin.css";
import { UserContext } from "../../context/user-context";
import { useAuth } from "../../context/auth-context";
import { easeInOut, motion as m } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserList } from "./components/user-list";
import { VerifyDocs } from "./components/verify-docs";
import { AddUser } from "./components/add-user";

export const Admin = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();

  if (!userSignedIn || (userSignedIn && user.userRole !== "Admin")) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container admin"
    >
      <Routes>
        <Route path="user-list" element={<UserList />} />
        <Route path="verify-docs" element={<VerifyDocs />} />
        <Route path="add-user" element={<AddUser />} />
      </Routes>
    </m.div>
  );
};
