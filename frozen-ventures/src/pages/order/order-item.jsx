import React from "react";

export const OrderItem = () => {

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
