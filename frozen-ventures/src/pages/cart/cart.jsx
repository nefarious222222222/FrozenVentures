import React, { useContext, useState } from "react";
import "../../assets/styles/cart.css";
import { PRODUCTS } from "../../Products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { ShoppingCart } from "phosphor-react";
import { Storefront } from "phosphor-react";
import { motion as m } from "framer-motion";

export const Cart = () => {
  const { cartItems } = useContext(ShopContext);
  const [shippingMode, setShippingMode] = useState("pickup");

  const totalPrice = Object.keys(cartItems).reduce((total, itemId) => {
    return (
      total +
      cartItems[itemId] * PRODUCTS.find((product) => product.id === parseInt(itemId)).price
    );
  }, 0);

  const handleCheckout = () => {
    console.log("Checkout completed!");
  };

  return (
    <div className="container cart">
      <div>
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

        {Object.values(cartItems).every((quantity) => quantity === 0) && (
          <div className="empty-cart">
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
                <span>Venture</span> into the <span>product catalog</span>, and maybe you'll find
                something <span>frosty</span>.
              </p>
              <button>
                <Storefront size={32} />
                Browse Shop
              </button>
            </div>
          </div>
        )}
      </div>

      {Object.values(cartItems).some((quantity) => quantity > 0) && (
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
              <p className="price">Php {totalPrice.toFixed(2)}</p>
            </div>

            <div className="shipping">
              <p className="label">Shipping</p>
              <p className="price">{shippingMode === "pickup" ? "Free" : "$2.99"}</p>
            </div>

            <div className="line"></div>

            <div className="total">
              <p className="label">Total</p>
              <p className="price">
                Php {(
                  totalPrice +
                  (shippingMode === "pickup" ? 0 : 2.99)
                ).toFixed(2)}
              </p>
            </div>

            <button className="cocButton" onClick={handleCheckout}>
              Check Out Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};