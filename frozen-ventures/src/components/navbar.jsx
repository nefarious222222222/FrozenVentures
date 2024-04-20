import React from "react";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { Storefront } from "phosphor-react";
import { ShoppingCart } from "phosphor-react";
import { Button } from "./button";

export const Navbar = () => {
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
          <Storefront className="link fake-button" size={32} color={"#533d70"} />
        </Link>
        <Link to="/cart">
          <ShoppingCart className="link fake-button" size={30} color={"#533d70"} />
        </Link>
        <Button onClick={handleClick} buttonText={"Sign In"} />
        <Button onClick={handleClick} buttonText={"Sign Up"} />
      </div>
    </div>
  );
};