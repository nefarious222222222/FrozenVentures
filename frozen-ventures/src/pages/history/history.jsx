import React, { useContext, useEffect, useRef, useState } from "react";
import "../../assets/styles/history.css";
import { UserContext } from "../../context/user-context";
import { fetchPurchaseHistory } from "../../firebase/firebase-order";
import {
  updateOrderStatusToCancel,
  updateOrderStatusToComplete,
} from "../../firebase/firebase-history";

const Popup = ({ orderId, productName, onClose }) => {
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const [cancelReason, setCancelReason] = useState("");
  const popupRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrderStatusToCancel(userId, orderId, cancelReason);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup">
      <form className="popup-content" ref={popupRef} onSubmit={handleSubmit}>
        <div className="popup-header">
          <h2>Cancel Order for {productName}</h2>
        </div>

        <label htmlFor="cancelReason" required>
          Reason for cancelling:
        </label>
        <select
          name="cancelReason"
          id="cancelReason"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a reason
          </option>
          <option value="Item no longer needed">Item no longer needed</option>
          <option value="Found better price elsewhere">
            Found better price elsewhere
          </option>
          <option value="Changed mind">Changed mind</option>
          <option value="Ordered by mistake">Ordered by mistake</option>
          <option value="Delivery taking too long">
            Delivery taking too long
          </option>
        </select>

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ConfirmPopup = ({ orderId, productName, onClose, onConfirm }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup">
      <div className="popup-content" ref={popupRef}>
        <div className="popup-header">
          <h2>Confirm Order Received for {productName}</h2>
        </div>
        <p>Are you sure you have received this order?</p>
        <div className="button-group">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export const History = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const userRole = user.userRole;

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [popupType, setPopupType] = useState("");

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const getPurchaseHistory = async () => {
      try {
        const orderData = await fetchPurchaseHistory(userRole, userId);
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

  const handleCancelClick = (orderId, productName) => {
    setSelectedOrder(orderId);
    setSelectedProduct(productName);
    setPopupType("cancel");
    setShowPopup(true);
  };

  const handleOrderReceivedClick = (orderId, productName) => {
    setSelectedOrder(orderId);
    setSelectedProduct(productName);
    setPopupType("confirm");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct("");
  };

  const handleConfirm = async () => {
    try {
      await updateOrderStatusToComplete(userId, selectedOrder);
      closePopup();
      window.location.reload();
    } catch (error) {
      console.error("Error updating order status to complete:", error);
    }
  };

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
            className={filter === "cancel requested" ? "active" : ""}
            onClick={() => setFilter("cancel requested")}
          >
            Cancel Request
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
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.orderId} className="order-item">
                {order.products.map((product) => (
                  <div key={product.productId} className="product-container">
                    <div className="group-date">
                      <div className="info">
                        <span>Order Date:</span>
                        <p>{order.orderDate}</p>
                      </div>

                      <div className="info">
                        <span>Shipping Date:</span>
                        <p>{order.shippingDate}</p>
                      </div>
                    </div>

                    <div className="product-details">
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
                        <span>Shipping Mode:</span>
                        <p>{capitalizeFirstLetter(order.shippingMode)}</p>
                      </div>

                      <div className="info">
                        <span>Status:</span>
                        <p>{capitalizeFirstLetter(order.status)}</p>
                      </div>

                      {order.status.toLowerCase() === "pending" && (
                        <button
                          onClick={() =>
                            handleCancelClick(
                              order.orderId,
                              product.productName
                            )
                          }
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>

                    {order.status.toLowerCase() === "to receive" && (
                      <button
                        onClick={() =>
                          handleOrderReceivedClick(
                            order.orderId,
                            product.productName
                          )
                        }
                      >
                        Order Received
                      </button>
                    )}

                    {order.status.toLowerCase() === "cancel requested" && (
                      <div className="info">
                        <span>Cancelation Reason:</span>
                        <p>{order.cancelReason}</p>
                      </div>
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

      {showPopup && popupType === "cancel" && (
        <Popup
          orderId={selectedOrder}
          productName={selectedProduct}
          onClose={closePopup}
        />
      )}

      {showPopup && popupType === "confirm" && (
        <ConfirmPopup
          orderId={selectedOrder}
          productName={selectedProduct}
          onClose={closePopup}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};