import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/user-context";
import { fetchMatchingOrdersForSeller } from "../../../../firebase/firebase-reseller";

export const ManageOrder = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const userRole = user.userRole;
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedOrders = await fetchMatchingOrdersForSeller(
        userRole,
        userId
      );
      setOrders(fetchedOrders);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (orders) {
      console.log("Filtered Orders:", orders);
    }
  }, [orders]);

  return (
    <div className="manage-order">
      <h1>Manage Order</h1>

      {orders.length > 0 ? (
        <ul>
          {orders.map(({ customerId, orderId, order }) => (
            <li key={`${customerId}-${orderId}`}>
              <p>
                <strong>Customer ID:</strong> {customerId}
              </p>
              <p>
                <strong>Order ID:</strong> {orderId}
              </p>
              <p>
                <strong>Order Date:</strong> {order.orderDate}
              </p>
              <p>
                <strong>Product ID:</strong> {order.pid}
              </p>
              <p>
                <strong>Product Name:</strong> {order.productName}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Subtotal:</strong> {order.subTotal}
              </p>
              <p>
                <strong>Shipping Mode:</strong> {order.shippingMode}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching orders found.</p>
      )}
    </div>
  );
};
