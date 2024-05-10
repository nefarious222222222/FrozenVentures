import React from "react";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.jpg";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { Storefront } from "phosphor-react";
import { ShoppingCart } from "phosphor-react";
import { useAuth } from "../context/auth-context";
import { doSignOut } from "../firebase/firebase-auth";

export const Navbar = () => {
  const { userSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isSignInPage = location.pathname === "/sign";

  if (isSignInPage) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate("/sign");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container navbar">
      <div className="title-container">
        <Link className="link-container" to="/">
          <img src={logo} alt="Sharsh" />
          <p className="link title">FrozenVentures</p>
        </Link>
      </div>

      <input type="text" placeholder="Search" />

      <div className="links">
        <Link to="/shop">
          <Storefront
            className="link fake-button"
            size={32}
            color={"#533d70"}
          />
        </Link>
        <Link to="/cart">
          <ShoppingCart
            className="link fake-button"
            size={30}
            color={"#533d70"}
          />
        </Link>
        {userSignedIn ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <Link to="/sign">
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};
