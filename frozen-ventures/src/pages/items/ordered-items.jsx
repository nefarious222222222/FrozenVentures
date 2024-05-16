import React, { useContext } from "react";
import "../../assets/styles/ordered-items.css"
import { OrderContext } from "../../context/order-context";

export const OrderedItems = () => {
  const { orderedItems } = useContext(OrderContext);

  return (
    <div className="container ordered-items">
      <h1>Ordered Items</h1>
      {orderedItems.length > 0 ? (
        orderedItems.map((order, index) => (
          <div key={index} className="order-item">
            {order.orders ? (
              order.orders.map((item, subIndex) => (
                <div key={subIndex} className="order-details">
                  <img src={item.image} alt={item.name} />
                  <div className="description">
                    <p>
                      <b>Product: {item.name}</b>
                    </p>
                    <p>Retailer: {item.retailer}</p>
                    <p>Price: Php {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total Price: Php {item.totalPrice}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="order-details">
                <img src={order.image} alt={order.name} />
                <div className="description">
                  <p>
                    <b>Product: {order.name}</b>
                  </p>
                  <p>Retailer: {order.retailer}</p>
                  <p>Price: Php {order.price}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Total Price: Php {order.totalPrice}</p>
                </div>
              </div>
            )}
            <div className="order-summary">
              <p>
                Shipping Cost:{" "}
                {order.shippingCost === "Free"
                  ? "Free"
                  : `Php ${order.shippingCost}`}
              </p>
              <p>Total Cost: Php {order.totalCost}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No orders have been placed yet.</p>
      )}
    </div>
  );
};
