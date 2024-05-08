import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Minus, Plus, Trash } from "phosphor-react";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);

  const handleMinusClick = () => {
    if (cartItems[id] > 0) {
      removeFromCart(id);
    }
  };

  const handlePlusClick = () => {
    addToCart(id);
  };

  const totalPrice = cartItems[id] * price;

  return (
    <div className="cart-item">
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
          <button onClick={handleMinusClick}>
            <Minus size={25} />
          </button>
          <input value={cartItems[id]} readOnly />
          <button onClick={handlePlusClick}>
            <Plus size={25} />
          </button>
        </div>

        <div className="group total-price">Php {totalPrice.toFixed(2)}</div>

        <div className="group delete">
          <button>
            <Trash size={45} />
          </button>
        </div>
      </div>
    </div>
  );
};