import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Minus } from "phosphor-react";
import { Plus } from "phosphor-react";
import { Trash } from "phosphor-react";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems } = useContext(ShopContext);

  return (
    <div className="cart-item">
      <div className="product">
        <div className="group information">
          <img src={productImage} />

          <div className="description">
            <p>
              <b>{productName}</b>
            </p>
            <p>Php {price}</p>
          </div>
        </div>

        <div className="group count-handler">
          <button>
            <Minus size={25} />
          </button>
          <input value={cartItems[id]} />
          <button>
            <Plus size={25} />
          </button>
        </div>

        <div className="group total-price">asd</div>

        <div className="group delete">
          <button>
            <Trash size={45} />
          </button>
        </div>
      </div>
    </div>
  );
};
