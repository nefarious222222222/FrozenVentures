import React from "react";
import "../../assets/styles/home.css";
import { Button } from "../../components/button";
import { PRODUCTS } from "../../Products";
import { Product } from "../shop/product";
import carrousel from "../../assets/images/0.jpg";
import one from "../../assets/images/1.jpg";
import two from "../../assets/images/2.jpg";
import three from "../../assets/images/3.jpg";
import four from "../../assets/images/4.jpg";
import five from "../../assets/images/5.png";

export const Home = () => {
  return (
    <div className="home">
      <section class="container hero">
        <div class="first-container">
          <img src={carrousel} alt="Sheesh" />
        </div>

        <div class="second-container">
          <h2>Flavors</h2>
          <p>Vaious flavors to suit your preferences</p>
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
            <Button
              className="top-button"
              onClick={console.log("Daily")}
              buttonText={"Daily"}
            />
            <Button
              className="top-button"
              onClick={console.log("Daily")}
              buttonText={"Weekly"}
            />
            <Button
              className="top-button"
              onClick={console.log("Daily")}
              buttonText={"Monthly"}
            />
          </div>
        </div>

        <div className="products">
          {PRODUCTS.map((product) => (
            <Product data={product} />
          ))}
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
          <button>More Flavors</button>
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
    </div>
  );
};
