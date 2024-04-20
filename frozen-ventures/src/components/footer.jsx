import React from "react";
import "../assets/styles/footer.css";
import logo from "../assets/images/logo.jpg";
import { FacebookLogo } from "phosphor-react";
import { InstagramLogo } from "phosphor-react";
import { TwitterLogo } from "phosphor-react";

export const Footer = () => {
  return (
    <div className="container footer">
      <div class="about-container">
        <div class="logo-container">
          <img src={logo} alt="Logo" />
          <h1>FrozenVentures</h1>
        </div>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          neque veniam perferendis nihil fuga, corporis quidem voluptatum iusto,
          modi quod minus mollitia maxime inventore ad recusandae iure deserunt
          laborum sint!
        </p>
      </div>

      <div class="contact-container">
        <h4>Contact Us</h4>

        <p>#420 Weederoo Street Showbu City</p>

        <p>frozenventures@icecream.com</p>

        <p>+63 9069420911</p>
      </div>

      <div class="social-container">
        <h4>Follow Us</h4>

        <div class="socials">
          <div class="social">
            <FacebookLogo size={30} />
            <p>@FrozenVentures</p>
          </div>

          <div class="social">
            <InstagramLogo size={30} />
            <p>@FrozenVentures</p>
          </div>

          <div class="social">
            <TwitterLogo size={30} />
            <p>@FVtweets</p>
          </div>
        </div>
      </div>
    </div>
  );
};
