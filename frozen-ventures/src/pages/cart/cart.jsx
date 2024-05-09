import React, { useContext, useState } from "react";
import "../../assets/styles/cart.css";
import { PRODUCTS } from "../../Products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { ShoppingCart } from "phosphor-react";
import { Storefront } from "phosphor-react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { CartCheckout } from "./cart-checkout";

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container cart"
    >
      <div className="cart-container">
        <h1>Your Cart Items</h1>

        <div className="cart-item">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Delete</th>
              </tr>
            </thead>
          </table>
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
        <CartCheckout />
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
