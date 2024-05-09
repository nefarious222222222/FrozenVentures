import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const OrderItem = (props) => {
  const { id, productName, price, retailerName, productImage } = props.data;
  const { cartItems } = useContext(ShopContext);

  const totalPrice = (cartItems[id] * price).toFixed(2);

  return (
    <div className="order-item">
      <table>
        <tbody>
          <tr>
            <td className="information">
              <img src={productImage} alt={productName} />
              <div className="description">
                <p>
                  <b>{productName}</b>
                </p>
                <p>Php {price}</p>
                <button>Remove</button>
              </div>
            </td>
            <td><p>{retailerName}</p></td>
            <td><p>{cartItems[id]}</p></td>
            <td><p>Php {totalPrice}</p></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
