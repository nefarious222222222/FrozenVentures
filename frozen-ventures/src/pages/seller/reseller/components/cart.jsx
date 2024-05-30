import React, { useContext, useState } from "react";
import { UserContext } from "../../../../context/user-context";
import { OrderContext } from "../../../../context/order-context";
import { CartItem } from "../../../cart/components/cart-item";
import { ShoppingCart, Storefront } from "phosphor-react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import dayjs from "dayjs";

export const Cart = () => {
  const { user } = useContext(UserContext);
  const { setOrder } = useContext(OrderContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [orderSet, setOrderSet] = useState(false);
  const [cartItemError, setCartItemError] = useState(false);
  const [errorProduct, setErrorProduct] = useState(null);

  const handleCheckout = async () => {
    console.log("awit");
  };

  return (
    <div className="cart-reseller">
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
                <th>Remove</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="cart-items">
          <CartItem setTotalPrice={setTotalPrice} setProducts={setProducts} />
        </div>
      </div>

      <AnimatePresence>
        {cartItemError && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="error-message"
          >
            <div className="header">
              <h2>Checkout Error</h2>
              <p>Quantity for {errorProduct} exceeds available stock</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>

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
                <span>Venture</span> into the <span>product catalog</span>, and
                maybe you'll find something <span>frosty</span>.
              </p>

              <button>
                <Storefront size={32} />
                Browse Shop
              </button>
            </div>
          </m.div>
        </AnimatePresence>
      )}
    </div>
  );
};
