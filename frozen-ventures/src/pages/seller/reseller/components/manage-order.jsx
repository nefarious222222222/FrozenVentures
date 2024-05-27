import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/user-context";
import {
  fetchMatchingOrdersForSeller,
  fetchUserPersonalInfo,
} from "../../../../firebase/firebase-reseller";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

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

  const [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      if (orders.length > 0) {
        const customerId = orders[0].customerId;
        const info = await fetchUserPersonalInfo(customerId);
        setCustomerInfo(info);
      }
    };

    fetchCustomerInfo();
  }, [orders]);

  const filteredOrders = orders.filter(({ order }) => {
    if (filter === "Order Request" && order.status === "pending") return true;
    if (filter === "Cancel Request" && order.status === "cancel request")
      return true;
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
          <div className="order-item-container">
            {filteredOrders.map(({ customerId, orderId, order }) => (
              <div className="order-item" key={`${customerId}-${orderId}`}>
                <div className="order-info">
                  <p>
                    {customerInfo.firstName} {customerInfo.lastName}
                  </p>
                  <p><span>Order Date:</span> {order.orderDate}</p>
                </div>

                {Object.keys(order).map(
                  (key) =>
                    key.startsWith("pid-") && (
                      <div className="product" key={key}>
                        <div className="product-info">
                          <img
                            src={order[key].productImage}
                            alt={order[key].productName}
                          />

                          <div className="product-description">
                            <p>{order[key].productName}</p>
                            <p>Php {order[key].productPrice}</p>
                            <p>{order[key].shopName}</p>
                          </div>
                        </div>

                        <div className="info">
                          <span>Quantity:</span>
                          <p>x{order[key].quantity}</p>
                        </div>

                        <div className="info">
                          <span>Total:</span>
                          <p>Php {order[key].subTotal}</p>
                        </div>

                        <div className="info">
                          <span>Shipping Mode:</span>
                          <p>{capitalizeFirstLetter(order.shippingMode)}</p>
                        </div>

                        <div className="info">
                          <span>Status:</span>
                          <p>{capitalizeFirstLetter(order.status)}</p>
                        </div>

                        {order.shippingMode === "pickup" ? (
                          <button>Accept</button>
                        ) : (
                          <button>Ship</button>
                        )}
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-section">
            <h2>Section <span>Empty</span></h2>
            <p>No <span>records</span> found for this <span>section</span></p>
          </div>
        )}
      </div>
    </div>
  );
};