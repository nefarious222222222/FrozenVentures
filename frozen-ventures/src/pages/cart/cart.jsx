import React, { useContext, useState } from "react";
import "../../assets/styles/cart.css";
import { UserContext } from "../../context/user-context";
import { useAuth } from "../../context/auth-context";
import { Navigate } from "react-router-dom";
import { CartItem } from "./components/cart-item";
import { ShoppingCart, Storefront } from "phosphor-react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { CartCheckout } from "./components/cart-checkout";

export const Cart = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container cart"
    >
      {!userSignedIn || (userSignedIn && user.userRole !== "Customer") ? (
        <Navigate to={"/home"} replace={true} />
      ) : null}
      <div className="cart-container">
        <h1>Your Cart Items</h1>

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

      {totalPrice > 0 ? (
        <CartCheckout totalAmount={totalPrice} products={products} userId={user.userId}/>
      ) : (
        <AnimatePresence>
          {totalPrice === 0 && (
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
    </m.div>
  );
};