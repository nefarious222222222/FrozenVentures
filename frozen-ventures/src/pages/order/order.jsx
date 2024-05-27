import React, { useContext, useState, useEffect } from "react";
import "../../assets/styles/order.css";
import { OrderContext } from "../../context/order-context";
import { UserContext } from "../../context/user-context";
import { motion as m, AnimatePresence, easeInOut } from "framer-motion";
import { ShoppingCart, Storefront, X } from "phosphor-react";
import { generateNewOrderId, createOrder } from "../../firebase/firebase-order";

export const Order = () => {
  const { orderProducts, shippingModeContext, clearOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const { products } = orderProducts || {};

  console.log(orderProducts)

  let shippingCost;
  if (shippingModeContext == "pickup") {
    shippingCost = 0;
  } else if (shippingModeContext == "delivery"){
    shippingCost = 10;
  }

  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userId = user.userId;

  let totalProductAmount = 0;

  if (products) {
    for (const productId in products) {
      const product = products[productId];
      totalProductAmount += product.productPrice * product.quantity;
    }
  }

  const totalOrderCost = parseFloat(totalProductAmount) + parseFloat(shippingCost);

  const handleConfirmOrderShow = () => {
    setShowConfirmOrder(true);
  };

  const handleConfirmOrderClose = () => {
    setShowConfirmOrder(false);
  };

  const handlePlaceOrder = async () => {
    try {
      let allOrdersCreated = true;
  
      for (const productId in products) {
        const product = products[productId];
        const orderId = await generateNewOrderId(userId);
    
        const productInfo = {
            productPrice: product.productPrice,
            productName: product.productName,
            productImage: product.productImage,
            shopName: product.shopName,
            quantity: product.quantity,
            subTotal: product.subTotal,
        };
    
        const orderInfo = {
            orderDate: product.orderDate,
            shippingMode: product.shippingMode,
            status: product.status,
        };
    
        const orderData = {
            ...orderInfo,
            [productId]: productInfo
        };
    
        await createOrder(userId, orderId, productId, orderData);
    }
  
    if (allOrdersCreated) {
      setShowConfirmOrder(false);
      setShowSuccessMessage(true);
  
        setTimeout(() => {
          clearOrder();
          window.location.href = "/home";
        }, 2000);
      } else {
        console.log("Error placing order");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                Order Total: <span>Php {totalOrderCost}</span>
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
            <button>Edit</button>
          </div>

          <h4>Vince Canaria</h4>
          <p>vincecanaria@gmail.com</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Shipping Address</h3>
            <button>Edit</button>
          </div>

          <p>#100 Dota Street</p>
          <p>Radiant</p>
          <p>Valve City</p>
          <p>Steam</p>
          <p>0420</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Payment</h3>
            <button>Edit</button>
          </div>

          <p>Cash On Delivery</p>
        </div>

        <div className="info">
          <div className="title-info">
            <h3>Shipping Date</h3>
            <button>Edit</button>
          </div>

          <p>May 9,2024</p>
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
                      <p>Php {(product.productPrice * product.quantity).toFixed(2)}</p>
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
              <p className="price">Php </p>
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
            className="success-message"
          >
            <div className="header">
              <h2>Order Placed Successfully</h2>
              <p>Your order has been successfully placed.</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};
