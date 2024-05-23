import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import { fetchOrderHistory } from "../../firebase/firebase-order";

export const OrderHistory = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const userId = user.userId;

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const orderData = await fetchOrderHistory(userId);
        console.log("Fetched order data:", orderData);
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    getOrderHistory();
  }, [userId]);

  return (
    <div className="container order-history">
      <h2>Order History</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={index}>
              <h3>Order {index + 1}</h3>
              <p>Subtotal: {order.subTotal}</p>
              <p>Shipping Fee: {order.shippingFee}</p>
              <h4>Products:</h4>
              <ul>
                {Object.values(order.products).map((product, productIndex) => (
                  <li key={productIndex}>
                    <p>Product Name: {product.productName}</p>
                    <p>Price: {product.productPrice}</p>
                    <p>Quantity: {product.quantity}</p>
                    {/* Render other product details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
};