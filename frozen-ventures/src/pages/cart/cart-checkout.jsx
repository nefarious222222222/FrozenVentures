import React, { useState,useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";

export const CartCheckout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount().toFixed(2);

  const [shippingMode, setShippingMode] = useState("pickup");
  const deliveryCost = 10.0;

  const shippingCost = shippingMode === "pickup" ? 0 : deliveryCost;

  const totalCost = parseFloat(totalAmount) + parseFloat(shippingCost);

  const handleShippingChange = (mode) => {
    setShippingMode(mode);
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
            onChange={() => handleShippingChange("pickup")}
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
            onChange={() => handleShippingChange("delivery")}
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
          <p className="price">Php {totalAmount}</p>
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
          <p className="price">Php {totalCost}</p>
        </div>

        <Link
          to={`/order?totalAmount=${totalAmount.toFixed}&shippingCost=${shippingCost}`}
        >
          <button className="cocButton">Check Out Now</button>
        </Link>
      </div>
    </div>
  );
};
