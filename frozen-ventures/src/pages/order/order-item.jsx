import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const OrderItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems } = useContext(ShopContext);

  const totalPrice = (cartItems[id] * price).toFixed(2);

  return (
    <div>
      <div className="product">
        <div className="group information">
          <img src={productImage} alt={productName} />

          <div className="description">
            <p>
              <b>{productName}</b>
            </p>
            <p>Php {price}</p>
          </div>
        </div>

        <div className="group count-handler">
          <p>{cartItems[id]}</p>
        </div>

        <div className="group total-price">Php {totalPrice}</div>
      </div>
    </div>
  );
};
