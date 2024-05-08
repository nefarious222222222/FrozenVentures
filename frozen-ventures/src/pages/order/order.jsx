import React, { useContext } from "react";
import "../../assets/styles/order.css";
import { motion as m } from "framer-motion";
import { PRODUCTS } from "../../Products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "../cart/cart-item";
import { OrderItem } from "./order-item";

export const Order = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container order"
    >
      <header>
        <h2>Order Confirmation</h2>

        <div className="tb-container">
          <p>
            Order Total: <span>Php {totalAmount}</span>
          </p>
          <button>Place Order</button>
        </div>
      </header>

      <div className="informations">
        <div className="info">
          <div className="title-info">
            <h3>Your Information</h3>
            <button>Edit</button>
          </div>

          <h4>Vince Canaria</h4>
          <p>vincecanaria@gmail.com</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Shipping Address</h3>
            <button>Edit</button>
          </div>

          <p>#100 Dota Street</p>
          <p>Radiant</p>
          <p>Valve City</p>
          <p>Steam</p>
          <p>0420</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Payment</h3>
            <button>Edit</button>
          </div>

          <p>Cash On Delivery</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Shipping Date</h3>
            <button>Edit</button>
          </div>

          <p>May 9,2024</p>
        </div>
      </div>

      <div className="item-container">
        <h1>Order Items</h1>

        <div className="label">
          <p className="item item1">Product</p>
          <p className="item item2">Quantity</p>
          <p className="item item3">Total</p>
          <p className="item item4">Delete</p>
        </div>

        <div className="item-checkout">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <OrderItem data={product} key={product.id} />;
            }
            return null;
          })}
        </div>
      </div>
    </m.div>
  );
};
