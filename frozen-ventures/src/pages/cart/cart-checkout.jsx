import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/order-context";
import { Link } from "react-router-dom";

export const CartCheckout = ({ totalAmount, products }) => {
  const { setOrder } = useContext(OrderContext);
  const [orderSet, setOrderSet] = useState(false);
  const [shippingMode, setShippingMode] = useState("pickup");

  const shippingCost = shippingMode === "delivery" ? 10.0 : 0.0;
  const totalPrice = totalAmount + shippingCost;

  const handleShippingChange = (event) => {
    setShippingMode(event.target.value);
  };

  const handleCheckout = async () => {
    try {

      const orderDetails = {
        products: products.reduce((acc, curr) => {
          const subTotal = parseFloat(curr.productPrice) * parseInt(curr.quantity);
          acc[curr.productId] = {
            productImage: curr.productImage,
            productName: curr.productName,
            productPrice: curr.productPrice,
            quantity: curr.quantity,
            shopName: curr.shopName,
            subTotal: subTotal.toFixed(2),
            shippingMode: shippingMode,
            status: "pending",
          };
          return acc;
        }, {}),
      };

      const shippingModeContext = shippingMode;

      setOrder(orderDetails, shippingModeContext);
      setOrderSet(true);
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  if (orderSet) {
    window.location.href = "/order";
  }
  
  return (
    <div className="cart-checkout">
      <div className="shipping-mode">
        <h2>Choose Shipping Mode:</h2>
        <form className="button-container">
          <input
            type="radio"
            name="shipping"
            value="pickup"
            id="pick-up"
            checked={shippingMode === "pickup"}
            onChange={handleShippingChange}
          />
          <label htmlFor="pick-up">
            Store Pick Up<span>•</span>
            <span>Php 0.00</span>
          </label>

          <input
            type="radio"
            name="shipping"
            value="delivery"
            id="delivery"
            checked={shippingMode === "delivery"}
            onChange={handleShippingChange}
          />
          <label htmlFor="delivery">
            Delivery<span>•</span>
            <span>Php 20.00</span>
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
          <p className="price">Php {shippingCost.toFixed(2)}</p>
        </div>

        <div className="line"></div>

        <div className="total">
          <p className="label">Total</p>
          <p className="price">Php {totalPrice.toFixed(2)}</p>
        </div>

        <button className="cocButton" onClick={handleCheckout}>
          Check Out Now
        </button>
      </div>
    </div>
  );
};