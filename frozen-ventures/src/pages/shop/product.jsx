import React, { useContext, useState, useEffect } from "react";
import "../../assets/styles/product.css";
import { ShopContext } from "../../context/shop-context";
import { WarningCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";

export const Product = (props) => {
  const { id, productName, price, retailerName, productImage } = props.data;
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
        <p>{retailerName}</p>
        <p className="price">Php {price}</p>
      </div>

      <div className="button-container">
        <button className="addToCartBtn" onClick={handleAddToCart}>
          Add to cart
        </button>
        <Link to={`/buy-item/${id}`}>
          <button className="buyNowBtn">Buy Now</button>
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
