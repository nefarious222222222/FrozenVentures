import React, { useContext, useEffect, useState } from "react";
import "../../assets/styles/history.css";
import { UserContext } from "../../context/user-context";
import { fetchOrderHistory } from "../../firebase/firebase-order";

export const History = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;

  const [orders, setOrders] = useState([]);
  const [toggledOrders, setToggledOrders] = useState({});

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const orderData = await fetchOrderHistory(userId);
        console.log("Fetched order data:", orderData);
        setOrders(orderData);
        const initialToggledOrdersState = {};
        orderData.forEach((order) => {
          initialToggledOrdersState[order.orderId] = false;
        });
        setToggledOrders(initialToggledOrdersState);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    getOrderHistory();
  }, [userId]);

  const toggleOrder = (orderId) => {
    setToggledOrders((prevToggledOrders) => ({
      ...prevToggledOrders,
      [orderId]: !prevToggledOrders[orderId],
    }));
  };

  return (
    <div className="container purchase-history">
      <h1>History</h1>
      <div className="purchase-container">
        {orders.map((order, index) => (
          <div key={order.orderId} className="order">
            <div
              className="order-header"
              onClick={() => toggleOrder(order.orderId)}
            >
              <h3>Order: {index + 1}</h3>

              <div className="order-info">
                <p>Date {order.orderDate}</p>
                <p>Shipping Mode: {order.shippingMode}</p>
                <p>Status: {order.status}</p>
              </div>
            </div>
            {toggledOrders[order.orderId] && (
              <div className="order-details">
                {order.products.map((product) => (
                  <div key={product.productId} className="product">
                    <div className="product-image">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                      />
                    </div>
                    <div className="product-info">
                      <p>{product.productName}</p>
                      <p>Price: Php {product.productPrice}</p>
                      <p>Retailer: {product.shopName}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Sub Total: {product.subTotal}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
