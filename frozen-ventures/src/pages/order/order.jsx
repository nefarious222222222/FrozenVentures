import React, { useContext } from "react";
import "../../assets/styles/order.css";
import { motion as m } from "framer-motion";
import { PRODUCTS } from "../../Products";
import { ShopContext } from "../../context/shop-context";
import { OrderItem } from "./order-item";

export const Order = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount().toFixed(2);

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

        <div className="order-item">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Retailer</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
          </table>
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
