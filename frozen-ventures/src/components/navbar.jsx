import React, { useContext } from "react";
import "../assets/styles/navbar.css";
import { UserContext } from "../context/user-context";
import { useAuth } from "../context/auth-context";
import logo from "../assets/images/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import { Storefront, ShoppingCart, UserCircle, Cube } from "phosphor-react";

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  const isSignInPage = location.pathname === "/sign";
  const isAdminPage = location.pathname === "/admin";
  const isAdminsPage = location.pathname.startsWith("/admin");

  if (isSignInPage || isAdminPage) {
    return null;
  } else if (isAdminsPage) {
    return null;
  }

  return showNavbar ? (
    <div className="navbar">
      <div className="title-container">
        <Link className="link-container" to="/home">
          <img src={logo} alt="Sharsh" />
          <p className="link title">FrozenVentures</p>
        </Link>
      </div>

      <input type="text" placeholder="Search" />

      <div className="links">
        <div className="links">
          {!userSignedIn || (userSignedIn && user?.userRole === "Customer") ? (
            <Link to="/shop">
              <Storefront
                className="link fake-button"
                size={32}
                color={"#533d70"}
              />
            </Link>
          ) : null}
        </div>

        {userSignedIn && user.userRole == "Customer" ? (
          <>
            <Link to="/cart">
              <ShoppingCart
                className="link fake-button"
                size={30}
                color={"#533d70"}
              />
            </Link>

            <Link to="/ordered-items">
              <Cube className="link fake-button" size={30} color={"#533d70"} />
            </Link>
          </>
        ) : null}

        {userSignedIn ? (
          <Link to="/user-menu">
            <UserCircle
              className="link fake-button"
              size={35}
              color={"#533d70"}
            />
          </Link>
        ) : (
          <Link to="/sign">
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </div>
  ) : null;
};
