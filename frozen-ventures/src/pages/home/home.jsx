import React, { useContext } from "react";
import "../../assets/styles/home.css";
import { UserContext } from "../../context/user-context";
import { useAuth } from "../../context/auth-context";
import { Navigate, useNavigate } from "react-router-dom";
import { Product } from "../shop/product";
import { easeInOut, motion as m } from "framer-motion";

import carrousel from "../../assets/images/0.jpg";
import one from "../../assets/images/1.jpg";
import two from "../../assets/images/2.jpg";
import three from "../../assets/images/3.jpg";
import four from "../../assets/images/4.jpg";
import five from "../../assets/images/5.png";

export const Home = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleMoreFlavorsClick = () => {
    navigate("/shop");
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="home"
    >
      {userSignedIn && user.userRole !== "Customer" ? <Navigate to={"/"} replace={true} /> : null}

      <section class="container hero">
        <div class="first-container">
          <img src={carrousel} alt="Sheesh" />
        </div>

        <div class="second-container">
          <h2>Flavors</h2>
          <p>Various flavors to suit your preferences</p>
        </div>

        <div class="third-container">
          <img class="item1" src={one} alt="" />
          <img class="item2" src={two} alt="" />
          <img class="item3" src={three} alt="" />
          <img class="item4" src={four} alt="" />
        </div>
      </section>

      <section class="container top-container">
        <div class="text-container">
          <h2>Top Products</h2>

          <div class="type-container">
            <button className="top-button">Daily</button>
            <button className="top-button">Weekly</button>
            <button className="top-button">Monthly</button>
          </div>
        </div>

        <div className="products">
          <Product />
        </div>
      </section>

      <section class="container more-container">
        <div class="tb-container">
          <h2>Need More Flavors?</h2>
          <p>
            Explore our extensive product catalog for a diverse range of
            delicious flavors, from classic favorites to innovative creations.
            Whether you're craving creamy indulgence, there's something to
            satisfy every palate and treat yourself to the perfect ice cream
            experience
          </p>
          <button onClick={handleMoreFlavorsClick}>More Flavors</button>
        </div>

        <img src={five} alt="" />
      </section>

      <section class="container service-container">
        <div class="text-container">
          <h2>Services</h2>
          <p>
            At FrozenVentures, we're passionate about bringing you the finest
            ice cream flavors and treats to satisfy your sweet cravings.
          </p>
        </div>

        <div class="services">
          <div class="service">
            <h3>
              <i class="bx bxs-package"></i> Delivery
            </h3>
            <p>Enjoy convenient ice cream delivery straight to your door.</p>
          </div>

          <div class="service">
            <h3>
              <i class="bx bx-money"></i> Payment
            </h3>
            <p>We accept payment via GCash and cash for your convenience.</p>
          </div>

          <div class="service">
            <h3>
              <i class="bx bxs-donate-heart"></i> Inquiry
            </h3>
            <p>
              For inquiries, contact us via email or phone. We're here to help!
            </p>
          </div>
        </div>
      </section>
    </m.div>
  );
};
