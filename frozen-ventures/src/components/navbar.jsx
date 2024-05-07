import React from "react";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import { Storefront } from "phosphor-react";
import { ShoppingCart } from "phosphor-react";
import { Button } from "./button";

export const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  const isSignInOrSignUp = pathname.includes("/sign");

  if (isSignInOrSignUp) {
    return null;
  }

  const handleClick = () => {
    console.log("CLICKED");
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
        <Link to="/sign">
          <Button onClick={handleClick} buttonText={"Sign In"} />
        </Link>
      </div>
    </div>
  );
};