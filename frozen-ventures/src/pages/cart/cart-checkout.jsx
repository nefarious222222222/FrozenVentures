import React, { useState } from "react";

export const CartCheckout = ({ totalAmount }) => {
  const [shippingMode, setShippingMode] = useState("pickup");
  const shippingCost = shippingMode === "delivery" ? 10.00 : 0.00;
  const totalPrice = totalAmount + shippingCost;

  const handleShippingChange = (event) => {
    setShippingMode(event.target.value);
  };

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
          <p className="price">Php {shippingCost.toFixed(2)}</p>
        </div>

        <div className="line"></div>

        <div className="total">
          <p className="label">Total</p>
          <p className="price">Php {totalPrice.toFixed(2)}</p>
        </div>

        <button className="cocButton">Check Out Now</button>
      </div>
    </div>
  );
};