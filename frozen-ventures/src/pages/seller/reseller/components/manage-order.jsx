import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/user-context";
import { fetchMatchingOrdersForSeller } from "../../../../firebase/firebase-reseller";

export const ManageOrder = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const userRole = user.userRole;
  const [orders, setOrders] = useState([]);

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

  console.log(orders);

  return (
    <div className="manage-order">
      <h1>Manage Order</h1>

      {orders.length > 0 ? (
        <ul>
          {orders.map(({ customerId, orderId, order }) => (
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
  );
};
