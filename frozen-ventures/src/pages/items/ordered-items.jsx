import React, { useContext } from "react";
import "../../assets/styles/ordered-items.css";
import { OrderContext } from "../../context/order-context";
import { motion as m, easeInOut } from "framer-motion";
import { Link } from "react-router-dom";
import { Cube, Storefront } from "phosphor-react";

export const OrderedItems = () => {
  const { orderedItems } = useContext(OrderContext);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container ordered-items"
    >
      <div className="ordered-container">
        <h1>Ordered Items</h1>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Shipping Cost</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
        {orderedItems.length > 0 ? (
          orderedItems.map((order, index) => (
            <div key={index}>
              <table className="order-table">
                <tbody>
                  <tr className="order-header">
                    <td className="order-id" colSpan="5">
                      <p>Order No.{index + 1}</p>
                    </td>
                    <td>
                      <p className="total-cost">
                        Total Cost: <span>Php {order.totalCost}</span>
                      </p>
                    </td>
                  </tr>
                  {order.orders ? (
                    order.orders.map((item, subIndex) => (
                      <tr key={subIndex}>
                        <td className="product-info">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="product-image"
                          />
                          <div className="product-description">
                            <p>{item.name}</p>
                            <p>{item.retailer}</p>
                            <p>Php {item.price}</p>
                          </div>
                        </td>
                        <td>
                          <p>{item.quantity}</p>
                        </td>
                        <td>
                          <p>Php {item.totalPrice}</p>
                        </td>
                        <td>
                          <p>
                            {order.shippingCost === "Free"
                              ? "Free"
                              : `Php ${parseFloat(order.shippingCost).toFixed(
                                  2
                                )}`}
                          </p>
                        </td>
                        <td>
                          <p>Pending</p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={index}>
                      <td className="product-info">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="product-image"
                        />
                        <div className="product-description">
                          <p>{order.name}</p>
                          <p>{order.retailer}</p>
                          <p>Php {order.price}</p>
                        </div>
                      </td>
                      <td>
                        <p>{order.quantity}</p>
                      </td>
                      <td>
                        <p>Php {order.totalPrice}</p>
                      </td>
                      <td>
                        <p>
                          {order.shippingCost === "Free"
                            ? "Free"
                            : `Php ${parseFloat(order.shippingCost).toFixed(
                                2
                              )}`}
                        </p>
                      </td>
                      <td>
                        <p>Pending</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="order-details">
                <div className="button-container">
                  <button>Cancel Order</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="empty-order"
          >
            <div className="message-one">
              <span>
                <Cube size={50} />
              </span>
              <h2>
                Your <span>ordered items</span> is empty
              </h2>
            </div>

            <div className="message-two">
              <p>
                <span>Venture</span> into the <span>product catalog</span>, and
                maybe you'll find something <span>frosty</span>.
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
      </div>
    </m.div>
  );
};
