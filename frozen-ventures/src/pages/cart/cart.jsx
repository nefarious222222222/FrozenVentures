import React, { useContext } from "react";
import "../../assets/styles/cart.css";
import { PRODUCTS } from "../../Products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";

export const Cart = () => {
  const { cartItems } = useContext(ShopContext);

  return (
    <div className="container cart">
      <div>
        <h1>Your Cart Items</h1>

        <div class="label">
          <p class="item item1">Product</p>
          <p class="item item2">Quantity</p>
          <p class="item item3">Total</p>
          <p class="item item4">Delete</p>
        </div>

        <div className="cart-items">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem data={product} />;
            }
          })}
        </div>
      </div>

      <div className="check-out">
        PUTANGIna
      </div>
    </div>
  );
};
