import React, { useContext, useState, useEffect } from "react";
import "../../assets/styles/product.css";
import { ShopContext } from "../../context/shop-context";
import { Button } from "../../components/button";
import { WarningCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart } = useContext(ShopContext);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(id);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

  return (
    <div className="product-container">
      <img src={productImage} alt="Product Image" />

      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Php {price}</p>
      </div>

      <div className="button-container">
        <Button
          className="addToCartBtn"
          onClick={handleAddToCart}
          buttonText={"Add To Cart"}
        />
        <Link to="/cart">
          <Button
            className="buyNowBtn"
            onClick={() => addToCart(id)}
            buttonText={"Buy Now"}
          />
        </Link>
      </div>

      <AnimatePresence>
        {showNotification && (
          <m.div
            className="notify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WarningCircle size={50} />
            <p>
              <span>{productName}</span> has been added to your cart.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
