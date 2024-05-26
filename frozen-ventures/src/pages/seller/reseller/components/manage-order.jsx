import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/user-context";
import { fetchMatchingOrdersForSeller } from "../../../../firebase/firebase-reseller";

export const ManageOrder = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const userRole = user.userRole;
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Order Request");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedOrders = await fetchMatchingOrdersForSeller(
        userRole,
        userId
      );
      setOrders(fetchedOrders);
    };

    fetchData();
  }, [userRole, userId]);

  const handleFilterClick = (value) => {
    setFilter(value);
  };

  const filteredOrders = orders.filter(({ order }) => {
    if (filter === "Order Request" && order.status === "pending") return true;
    if (filter === "Cancel Request" && order.status === "cancel request") return true;
    if (filter === "Refund Request" && order.status === "refund request")
      return true;
    if (filter === "Completed" && order.status === "completed") return true;
    if (filter === "Returned Order" && order.status === "returned") return true;
    return false;
  });

  return (
    <div className="manage-order">
      <h1>Manage Order</h1>

      <div className="order-container">
        <div className="button-group">
          <button
            className={filter === "Order Request" ? "active" : ""}
            onClick={() => handleFilterClick("Order Request")}
          >
            Order Request
          </button>
          <button
            className={filter === "Cancel Request" ? "active" : ""}
            onClick={() => handleFilterClick("Cancel Request")}
          >
            Cancel Request
          </button>
          <button
            className={filter === "Refund Request" ? "active" : ""}
            onClick={() => handleFilterClick("Refund Request")}
          >
            Refund Request
          </button>
          <button
            className={filter === "Completed" ? "active" : ""}
            onClick={() => handleFilterClick("Completed")}
          >
            Completed
          </button>
          <button
            className={filter === "Returned Order" ? "active" : ""}
            onClick={() => handleFilterClick("Returned Order")}
          >
            Returned Order
          </button>
        </div>

        {filteredOrders.length > 0 ? (
          <ul>
            {filteredOrders.map(({ customerId, orderId, order }) => (
              <li key={`${customerId}-${orderId}`}>
                <p>Customer ID: {customerId}</p>
                <p>Order ID: {orderId}</p>
                <p>Order Date: {order.orderDate}</p>
                {Object.keys(order).map(
                  (key) =>
                    key.startsWith("pid-") && (
                      <div key={key}>
                        <p>Product ID: {key}</p>
                        <p>Product Name: {order[key].productName}</p>
                        <p>
                          Product Image:{" "}
                          <img
                            src={order[key].productImage}
                            alt={order[key].productName}
                          />
                        </p>
                        <p>Product Price: {order[key].productPrice}</p>
                        <p>Quantity: {order[key].quantity}</p>
                        <p>Subtotal: {order[key].subTotal}</p>
                        <p>Shop Name: {order[key].shopName}</p>
                      </div>
                    )
                )}
                <p>Shipping Mode: {order.shippingMode}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching orders found.</p>
        )}
      </div>
    </div>
  );
};
