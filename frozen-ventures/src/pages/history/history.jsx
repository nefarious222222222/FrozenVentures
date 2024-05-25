import React, { useContext, useEffect, useState } from "react";
import "../../assets/styles/history.css";
import { UserContext } from "../../context/user-context";
import { fetchPurchaseHistory } from "../../firebase/firebase-order";

export const History = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("pending"); // Default filter set to "pending"

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const getPurchaseHistory = async () => {
      try {
        const orderData = await fetchPurchaseHistory(userId);
        console.log("Fetched order data:", orderData);
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    getPurchaseHistory();
  }, [userId]);

  const filteredOrders = orders.filter((order) => {
    if (!filter) return true; // Show all orders if no filter is selected
    return order.status.toLowerCase() === filter;
  });

  return (
    <div className="container history">
      <h1>History</h1>

      <div className="history-container">
        <div className="button-group">
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={filter === "to receive" ? "active" : ""}
            onClick={() => setFilter("to receive")}
          >
            To Receive
          </button>
          <button
            className={filter === "cancelled" ? "active" : ""}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="order-container">
          {filteredOrders.map((order) => (
            <div key={order.orderId} className="order-item">
              {order.products.map((product) => (
                <div key={product.productId} className="product-container">
                  <div className="product">
                    <img src={product.productImage} alt={product.productName} />

                    <div className="product-info">
                      <h2>{product.productName}</h2>
                      <p>Php {product.productPrice}</p>
                      <p>{product.shopName}</p>
                    </div>
                  </div>

                  <p>x{product.quantity}</p>
                  <p>Php {product.subTotal}</p>
                  <p>{order.orderDate}</p>
                  <p>{capitalizeFirstLetter(order.shippingMode)}</p>
                  <p>{capitalizeFirstLetter(order.status)}</p>
                  {order.status.toLowerCase() === "pending" && (
                    <button>Cancel Order</button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};