import React, { useContext, useState, useEffect } from "react";
import "../../assets/styles/order.css";
import { OrderContext } from "../../context/order-context";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import { motion as m, AnimatePresence, easeInOut } from "framer-motion";
import { ShoppingCart, Storefront, X } from "phosphor-react";
import dayjs from "dayjs";
import { generateNewOrderId, createOrder } from "../../firebase/firebase-order";
import {
  getUserInfoById,
  getUserPersonalInfoById,
} from "../../firebase/firebase-users";

export const Order = () => {
  const { orderProducts, clearOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const { products } = orderProducts || {};
  const navigate = useNavigate();

  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formUserPersonal, setFormUserPersonal] = useState({
    firstName: "",
    lastName: "",
    street: "",
    barangay: "",
    municipality: "",
    province: "",
    zip: "",
  });
  const [isEditingShippingMode, setIsEditingShippingMode] = useState(false);
  const [isEditingShippingDate, setIsEditingShippingDate] = useState(false);
  const [shippingMode, setShippingMode] = useState("pickup");
  const [shippingAddressError, setShippingAddressError] = useState(false);

  const userId = user.userId;
  const userRole= user.userRole;

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userId) {
        const userData = await getUserInfoById(user?.userId);
        const userPersonal = await getUserPersonalInfoById(user?.userId);

        if (userData && userPersonal) {
          const userEmail = userData.email;

          setFormUserPersonal({
            firstName: userPersonal.firstName,
            lastName: userPersonal.lastName,
            street: userPersonal.street,
            barangay: userPersonal.barangay,
            municipality: userPersonal.municipality,
            province: userPersonal.province,
            zip: userPersonal.zip,
          });

          setUserEmail(userEmail);
        }
      }
    };

    fetchData();
  }, [user?.userId]);

  const handleEditUserInfo = () => {
    navigate("/user-menu");
  };

  const handleEditShippingAddress = () => {
    navigate("/user-menu");
  };

  let totalProductAmount = 0;

  if (products) {
    for (const productId in products) {
      const product = products[productId];
      totalProductAmount += product.productPrice * product.quantity;
    }
  }

  const shippingCost = shippingMode === "pickup" ? 0 : 10;
  const totalOrderCost =
    parseFloat(totalProductAmount) + parseFloat(shippingCost);

  const handleConfirmOrderShow = () => {
    if (isShippingAddressEmpty()) {
      setShippingAddressError(true);

      setTimeout(() => {
        setShippingAddressError(false);
      }, 2000);
    } else {
      setShowConfirmOrder(true);
    }
  };

  const handleConfirmOrderClose = () => {
    setShowConfirmOrder(false);
  };

  const handlePlaceOrder = async () => {
    try {
      if (isShippingAddressEmpty()) {
        setShippingAddressError(true);
        return;
      }

      let allOrdersCreated = true;

      for (const productId in products) {
        const product = products[productId];
        const orderId = await generateNewOrderId(userId);

        const productInfo = {
          productPrice: product.productPrice,
          productName: product.productName,
          productImage: product.productImage,
          shopName: product.shopName,
        };

        const orderInfo = {
          orderDate: product.orderDate,
          shippingMode: shippingMode,
          shippingDate: shippingDate,
          status: product.status,
          quantity: product.quantity,
          subTotal: product.subTotal,
        };

        const orderData = {
          ...orderInfo,
          [productId]: productInfo,
        };

        await createOrder(userRole, userId, orderId, orderData);
      }

      if (allOrdersCreated) {
        setShowConfirmOrder(false);
        setShowSuccessMessage(true);

        setTimeout(() => {
          clearOrder();
          window.location.href = "/home";
        }, 1000);
      } else {
        console.log("Error placing order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditShippingMode = () => {
    setIsEditingShippingMode(!isEditingShippingMode);
  };

  const handleShippingModeChange = (mode) => {
    setShippingMode(mode);
    setIsEditingShippingMode(false);
  };

  const handleEditShippingDate = () => {
    setIsEditingShippingDate(!isEditingShippingDate);
  };

  const handleShippingDateChange = (event) => {
    const selectedDate = dayjs(event.target.value);
    const formattedDate = selectedDate.format("MMMM DD, YYYY");
    setShippingDate(formattedDate);
    setIsEditingShippingDate(false);
  };

  const isShippingAddressEmpty = () => {
    const { street, barangay, municipality, province, zip } = formUserPersonal;
    return !street || !barangay || !municipality || !province || !zip;
  };

  const getCurrentDate = () => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    return currentDate;
  };

  const getMaxDate = () => {
    return dayjs().add(7, "day").format("YYYY-MM-DD");
  };

  const [shippingDate, setShippingDate] = useState(getCurrentDate());

  useEffect(() => {
    const formattedDate = dayjs(shippingDate).format("MMMM DD, YYYY");
    setShippingDate(formattedDate);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container order"
    >
      <header>
        <h2>Order Confirmation</h2>

        <div className="tb-container">
          {totalProductAmount > 0 ? (
            <>
              <p>
                Order Total: <span>Php {totalOrderCost.toFixed(2)}</span>
              </p>
              <button onClick={handleConfirmOrderShow}>Place Order</button>
            </>
          ) : null}
        </div>
      </header>

      <div className="informations">
        <div className="info">
          <div className="title-info">
            <h3>Your Information</h3>
            <button onClick={handleEditUserInfo}>Edit</button>
          </div>

          <h4>
            {formUserPersonal.firstName} {formUserPersonal.lastName}
          </h4>
          <p>{userEmail}</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Shipping Address</h3>
            <button onClick={handleEditShippingAddress}>Edit</button>
          </div>

          <p>{formUserPersonal.street}</p>
          <p>{formUserPersonal.barangay}</p>
          <p>{formUserPersonal.municipality}</p>
          <p>{formUserPersonal.province}</p>
          <p>{formUserPersonal.zip}</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Shipping Mode</h3>
            <button onClick={handleEditShippingMode}>Edit</button>
          </div>
          {isEditingShippingMode ? (
            <div className="ship-group">
              <button
                className="ship-btn"
                onClick={() => handleShippingModeChange("pickup")}
              >
                Pickup
              </button>
              <button
                className="ship-btn"
                onClick={() => handleShippingModeChange("delivery")}
              >
                Delivery
              </button>
            </div>
          ) : (
            <p>
              {shippingMode.charAt(0).toUpperCase() + shippingMode.slice(1)}
            </p>
          )}
        </div>

        <div className="info">
          <div className="title-info">
            <h3>
              {shippingMode.charAt(0).toUpperCase() + shippingMode.slice(1)}{" "}
              Date
            </h3>
            <button onClick={handleEditShippingDate}>Edit</button>
          </div>
          {isEditingShippingDate ? (
            <input
              className="ship-date"
              type="date"
              min={getCurrentDate()}
              max={getMaxDate()}
              value={getCurrentDate()}
              onChange={handleShippingDateChange}
            />
          ) : (
            <p>{shippingDate}</p>
          )}
        </div>
      </div>

      <div className="item-container">
        <h2>Order Items</h2>

        <div className="order-item">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Retailer</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                Object.entries(products).map(([productId, product]) => (
                  <tr key={productId}>
                    <td>
                      <img
                        src={product.productImage}
                        alt={product.productName}
                      />
                      <p>{product.productName}</p>
                    </td>
                    <td>
                      <p>{product.shopName}</p>
                    </td>
                    <td>
                      <p>{product.quantity}</p>
                    </td>
                    <td>
                      <p>
                        Php{" "}
                        {(product.productPrice * product.quantity).toFixed(2)}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalProductAmount > 0 ? (
        <div className="t-container">
          <div className="total-container">
            <h2>Total Cost</h2>
            <div className="sub-total">
              <p className="label">Sub Total</p>
              <p className="price">Php {totalProductAmount.toFixed(2)}</p>
            </div>
            <div className="shipping">
              <p className="label">Shipping</p>
              <p className="price">Php {shippingCost.toFixed(2)}</p>
            </div>
            <div className="line"></div>
            <div className="total">
              <p className="label">Total</p>
              <p className="price">Php {totalOrderCost.toFixed(2)}</p>
            </div>
            <button onClick={handleConfirmOrderShow}>Place Order</button>{" "}
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {totalProductAmount < 0 && (
            <m.div
              key="empty-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="empty-cart"
            >
              <div className="message-one">
                <span>
                  <ShoppingCart size={50} />
                </span>
                <h2>
                  Your <span>cart</span> is empty
                </h2>
              </div>

              <div className="message-two">
                <p>
                  <span>Venture</span> into the <span>product catalog</span>,
                  and maybe you'll find something <span>frosty</span>.
                </p>
                <Link to="/shop">
                  <button>
                    <Storefront size={32} />
                    Browse Shop
                  </button>
                </Link>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {showConfirmOrder && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="confirm-order"
          >
            <X
              className="x-button"
              size={32}
              onClick={handleConfirmOrderClose}
            />
            <div className="header">
              <h2>Confirm Order</h2>
              <p>Are you certain you wish to place order?</p>
            </div>

            <div className="buttons">
              <button onClick={handlePlaceOrder}>Yes</button>
              <button onClick={handleConfirmOrderClose}>Cancel</button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessMessage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="success message"
          >
            <div className="header">
              <h2>Order Successful</h2>
              <p>Your order has been successfully placed</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shippingAddressError && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="error message"
          >
            <div className="header">
              <h2>Order Unsuccessful</h2>
              <p>Address cannot be incomplete</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};
