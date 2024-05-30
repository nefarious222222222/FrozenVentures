import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/user-context";
import { fetchPurchaseHistory } from "../../../../firebase/firebase-order";

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
          {/* DITO YUNG ORDER NG RETAILER AND DISTRIBUTOR */}
        </div>
      </div>
    </div>
  );
};