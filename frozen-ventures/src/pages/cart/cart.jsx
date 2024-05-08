import React, { useContext, useState } from "react";
import "../../assets/styles/cart.css";
import { PRODUCTS } from "../../Products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { ShoppingCart } from "phosphor-react";
import { Storefront } from "phosphor-react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const [shippingMode, setShippingMode] = useState("pickup");

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container cart"
    >
      <div className="cart-container">
        <h1>Your Cart Items</h1>

        <div className="label">
          <p className="item item1">Product</p>
          <p className="item item2">Quantity</p>
          <p className="item item3">Total</p>
          <p className="item item4">Delete</p>
        </div>

        <div className="cart-items">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem data={product} key={product.id} />;
            }
            return null;
          })}
        </div>
      </div>

      {totalAmount > 0 ? (
        <div className="check-out">
          <div className="shipping-mode">
            <h2>Choose Shipping Mode:</h2>

            <form className="button-container">
              <input
                type="radio"
                name="shipping"
                value="pickup"
                id="pick-up"
                checked={shippingMode === "pickup"}
                onChange={() => setShippingMode("pickup")}
              />
              <label htmlFor="pick-up">
                Store Pick Up<span>•</span>
                <span>Free</span>
              </label>

              <input
                type="radio"
                name="shipping"
                value="delivery"
                id="delivery"
                checked={shippingMode === "delivery"}
                onChange={() => setShippingMode("delivery")}
              />
              <label htmlFor="delivery">
                Delivery<span>•</span>
                <span>Php 10.00</span>
              </label>
            </form>
          </div>

          <div className="total-container">
            <div className="sub-total">
              <p className="label">Sub Total</p>
              <p className="price">Php {totalAmount.toFixed(2)}</p>
            </div>

            <div className="shipping">
              <p className="label">Shipping</p>
              <p className="price">
                {shippingMode === "pickup" ? "Free" : "Php 10.00"}
              </p>
            </div>

            <div className="line"></div>

            <div className="total">
              <p className="label">Total</p>
              <p className="price">
                Php{" "}
                {(totalAmount + (shippingMode === "pickup" ? 0 : 2.99)).toFixed(
                  2
                )}
              </p>
            </div>

            <Link to="/order">
              <button className="cocButton">Check Out Now</button>
            </Link>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {Object.values(cartItems).every((quantity) => quantity === 0) && (
            <m.div
              key="empty-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="empty-cart"
            >
              <div className="message-one">
                <span>
                  <ShoppingCart size={50} />
                </span>
                <h2>
                  Your <span>cart</span> is empty
                </h2>
              </div>

              <div className="message-two">
                <p>
                  <span>Venture</span> into the <span>product catalog</span>,
                  and maybe you'll find something <span>frosty</span>.
                </p>
                <Link to="/shop">
                  <button>
                    <Storefront size={32} />
                    Browse Shop
                  </button>
                </Link>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      )}
    </m.div>
  );
};
