import React, { useContext, useEffect, useState } from "react";
import "../../assets/styles/order-history.css";
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
      <div className="history-container">
        <h1>Order History</h1>
        {orders.length > 0 ? (
          <div className="order-container">
            {orders.map((order, index) => (
              <div className="user-order" key={index}>
                <h2>Order {index + 1}</h2>
                <div className="order-info">
                  <p>
                    Subtotal: <span> Php {order.subTotal}</span>
                  </p>
                  <p>
                    Shipping Fee:{" "}
                    <span> Php {order.shippingFee.toFixed(2)}</span>
                  </p>
                  <p>
                    Total Amount:
                    <span>
                      {" "}
                      Php {Number(order.subTotal) + Number(order.shippingFee)}
                    </span>
                  </p>
                </div>

                <h3>Products:</h3>
                <div className="products-container">
                  {Object.values(order.products).map(
                    (product, productIndex) => (
                      <div className="product" key={productIndex}>
                        <img src={product.productImage} alt="" />

                        <div className="product-info">
                          <p>Product Name: <span>{product.productName}</span></p>
                          <p>Retailer: <span>{product.shopName}</span></p>
                          <p>Price: <span>Php {product.productPrice}</span></p>
                          <p>Quantity: <span>{product.quantity}</span></p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found for this user.</p>
        )}
      </div>
    </div>
  );
};
