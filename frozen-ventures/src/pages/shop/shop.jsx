import React from "react";
import "../../assets/styles/shop.css";
import carrousel from "../../assets/images/0.jpg";
import { Button } from "../../components/button";
import { PRODUCTS } from "../../Products";
import { Product } from "./product";
import { easeInOut, motion as m } from "framer-motion";

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
        <Button onClick={console.log("Filter")} buttonText={"Filter"} />
        <Button
          className="filterButton"
          onClick={console.log("All")}
          buttonText={"All"}
        />
        <Button
          className="filterButton"
          onClick={console.log("Chocolate")}
          buttonText={"Chocolate"}
        />
        <Button
          className="filterButton"
          onClick={console.log("Vanilla")}
          buttonText={"Vanilla"}
        />
        <Button
          className="filterButton"
          onClick={console.log("Rocky Road")}
          buttonText={"Rocky Road"}
        />
        <Button
          className="filterButton"
          onClick={console.log("Matcha")}
          buttonText={"Matcha"}
        />
        <Button
          className="filterButton"
          onClick={console.log("Cookies n' Cream")}
          buttonText={"Cookies n' Cream"}
        />
      </div>

      <div className="products-container">
        <div className="products">
          {PRODUCTS.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </div>
    </m.div>
  );
};
