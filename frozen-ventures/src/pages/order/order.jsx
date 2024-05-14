import React, { useContext } from "react";
import "../../assets/styles/order.css";
import { motion as m, AnimatePresence, easeInOut } from "framer-motion";
import { PRODUCTS } from "../../Products";
import { ShopContext } from "../../context/shop-context";
import { OrderItem } from "./order-item";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { Storefront } from "phosphor-react";

export const Order = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount().toFixed(2);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shippingCost = searchParams.get("shippingCost");

  let newShippingCost;
  let totalCost;

  console.log(shippingCost);

  if (shippingCost.toString() === "0" ) {
    newShippingCost = "Free";
    totalCost = totalAmount;
  } else {
    newShippingCost = parseFloat(shippingCost).toFixed(2);
    totalCost = parseFloat(totalAmount) + parseFloat(shippingCost);
  }

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
        <h2>Order Items</h2>

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

      {totalAmount > 0 ? (
        <div className="t-container">
          <div className="total-container">
            <h2>Total Cost</h2>
            <div className="sub-total">
              <p className="label">Sub Total</p>
              <p className="price">Php {totalAmount}</p>
            </div>

            <div className="shipping">
              <p className="label">Shipping</p>
              <p className="price">
                {newShippingCost === "Free"
                  ? newShippingCost
                  : `Php ${newShippingCost}`}
              </p>
            </div>

            <div className="line"></div>

            <div className="total">
              <p className="label">Total</p>
              <p className="price">Php {totalCost}</p>
            </div>

            <button>Place Order</button>
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
