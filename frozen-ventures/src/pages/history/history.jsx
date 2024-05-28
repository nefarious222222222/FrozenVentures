import React, { useContext, useEffect, useState } from "react";
import "../../assets/styles/history.css";
import { UserContext } from "../../context/user-context";
import { fetchPurchaseHistory } from "../../firebase/firebase-order";

export const History = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("pending");

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
    if (!filter) return true;
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
            className={filter === "cancel request" ? "active" : ""}
            onClick={() => setFilter("cancel request")}
          >
            Cancel Request
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="order-container">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.orderId} className="order-item">
                {order.products.map((product) => (
                  <div key={product.productId} className="product-container">
                    <div className="product">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                      />

                      <div className="product-info">
                        <h2>{product.productName}</h2>
                        <p>Php {product.productPrice}</p>
                        <p>{product.shopName}</p>
                      </div>
                    </div>

                    <div className="info">
                      <span>Quantity:</span>
                      <p>x{order.quantity}</p>
                    </div>

                    <div className="info">
                      <span>Total:</span>
                      <p>Php {order.subTotal}</p>
                    </div>

                    <div className="info">
                      <span>Order Date:</span>
                      <p>{order.orderDate}</p>
                    </div>

                    <div className="info">
                      <span>Shipping Date:</span>
                      <p>{order.shippingDate}</p>
                    </div>

                    <div className="info">
                      <span>Shipping Mode:</span>
                      <p>{capitalizeFirstLetter(order.shippingMode)}</p>
                    </div>

                    <div className="info">
                      <span>Status:</span>
                      <p>{capitalizeFirstLetter(order.status)}</p>
                    </div>

                    {order.status.toLowerCase() === "pending" && (
                      <button>Cancel Order</button>
                    )}

                    {order.status.toLowerCase() === "to receive" && (
                      <button>Order Received</button>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="empty-section">
              <h2>
                Section <span>Empty</span>
              </h2>
              <p>
                No <span>records</span> found for this <span>section</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
