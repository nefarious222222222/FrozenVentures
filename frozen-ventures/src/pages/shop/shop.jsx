import React from "react";
import "../../assets/styles/shop.css";
import { Products } from "./products";
import { easeInOut, motion as m } from "framer-motion";

import carrousel from "../../assets/images/0.jpg";

export const Shop = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container shop"
    >
      <div className="carrousel">
        <img src={carrousel} alt="" />
      </div>

      <div className="text-container">
        <h2>Check out the shop</h2>
        <p>Find the flavor that suits you</p>
      </div>

      <div className="button-container">
        <button className="filterButton">Peanut</button>
        <button className="filterButton">Chocolate</button>
        <button className="filterButton">Vanilla</button>
        <button className="filterButton">Mancha</button>
        <button className="filterButton">Rocky Road</button>
      </div>

      <div className="products-container">
        <div className="products">
          <Products />
        </div>
      </div>
    </m.div>
  );
};
