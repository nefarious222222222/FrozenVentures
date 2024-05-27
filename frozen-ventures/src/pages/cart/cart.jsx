import React, { useContext, useState } from "react";
import "../../assets/styles/cart.css";
import { UserContext } from "../../context/user-context";
import { OrderContext } from "../../context/order-context";
import { useAuth } from "../../context/auth-context";
import { Navigate } from "react-router-dom";
import { CartItem } from "./components/cart-item";
import { ShoppingCart, Storefront } from "phosphor-react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export const Cart = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const { setOrder } = useContext(OrderContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [orderSet, setOrderSet] = useState(false);

  const handleCheckout = async () => {
    try {
      const currentDate = dayjs().format("MMMM D, YYYY");

      const orderDetails = {
        products: products.reduce((acc, curr) => {
          const subTotal = parseFloat(curr.productPrice) * parseInt(curr.quantity);
          acc[curr.productId] = {
            productImage: curr.productImage,
            productName: curr.productName,
            productPrice: curr.productPrice,
            quantity: curr.quantity,
            shopName: curr.shopName,
            subTotal: subTotal.toFixed(2),
            status: "pending",
            orderDate: currentDate,
          };
          return acc;
        }, {}),
      };

      setOrder(orderDetails);
      setOrderSet(true);
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  if (orderSet) {
    return <Navigate to="/order" replace />;
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container cart"
    >
      {!userSignedIn || (userSignedIn && user.userRole !== "Customer") ? (
        <Navigate to="/home" replace={true} />
      ) : null}
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart Items</h1>

          <div className="checkout">
            <p>
              <span>Sub Total: </span>Php {totalPrice.toFixed(2)}
            </p>

            <button
              className="checkOutButton"
              onClick={handleCheckout}
              disabled={totalPrice === 0}
            >
              Check Out
            </button>
          </div>
        </div>

        <div className="cart-item">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Delete</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="cart-items">
          <CartItem setTotalPrice={setTotalPrice} setProducts={setProducts} />
        </div>
      </div>

      {totalPrice === 0 && (
        <AnimatePresence>
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
        </AnimatePresence>
      )}
    </m.div>
  );
};