import React, { useContext } from "react";
import "../../../assets/styles/navbar.css";
import { UserContext } from "../../../context/user-context";
import { doSignOut } from "../../../firebase/firebase-auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";
import { UserList, CheckCircle, UserPlus } from "phosphor-react";

export const AdminNavbar = () => {
  const { clearUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await doSignOut();
      clearUser();
      navigate("/sign");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isAdminPage = location.pathname.startsWith("/admin");
  if (!isAdminPage) {
    return null;
  }

  return (
    <div className="navbar">
      <div className="title-container">
        <Link className="link-container" to="/admin">
          <img src={logo} alt="Sharsh" />
          <p className="link title">FrozenVentures</p>
        </Link>
      </div>

      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "var(--color-violet)",
        }}
      >
        Administration Account
      </h1>

      <div className="links">
        <Link to="/admin/user-list">
          <UserList className="link fake-button" size={35} color={"#533d70"} />
        </Link>

        <Link to="/admin/verify-docs">
          <CheckCircle
            className="link fake-button"
            size={35}
            color={"#533d70"}
          />
        </Link>

        <Link to="/admin/add-user">
          <UserPlus className="link fake-button" size={35} color={"#533d70"} />
        </Link>

        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};
