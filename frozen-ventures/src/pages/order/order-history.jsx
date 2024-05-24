import React, { useContext, useEffect, useState } from "react";
import "../../assets/styles/order-history.css";
import { UserContext } from "../../context/user-context";
import { fetchOrderHistory } from "../../firebase/firebase-order";

export const OrderHistory = () => {
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
    <div className="container order-history">
      <h2>Order History</h2>
      {orders.map((order, index) => (
        <div key={order.orderId} className="order">
          <div
            className="order-header"
            onClick={() => toggleOrder(order.orderId)}
          >
            <h3>Order: {index + 1}</h3>
            <p>Date</p>
          </div>
          {toggledOrders[order.orderId] && (
            <div className="order-details">
              {order.products.map((product) => (
                <div key={product.productId} className="product">
                  <div className="product-image">
                    <img src={product.productImage} alt={product.productName} />
                  </div>
                  <div className="product-info">
                    <div className="product-name">{product.productName}</div>
                    <div className="product-price">{product.productPrice}</div>
                    <div className="product-quantity">{product.quantity}</div>
                    <div className="product-shop-name">{product.shopName}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
