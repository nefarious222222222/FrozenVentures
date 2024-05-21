import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/user-context";
import { Minus, Plus, Trash } from "phosphor-react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import { fetchCartItemsForUser, removeItemFromCart, addItemToCart } from "../../firebase/firebase-products";

export const CartItem = ({ setTotalPrice }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const confirmDeleteRef = useRef(null);

  const userId = user.userId;

  useEffect(() => {
    const fetchCartItems = () => {
      if (userId) {
        try {
          fetchCartItemsForUser(userId, (cartItemsData) => {
            console.log("Cart items data:", cartItemsData);
            if (typeof cartItemsData === "object") {
              const cartItemsArray = Object.keys(cartItemsData).map((key) => ({
                productId: key,
                ...cartItemsData[key],
              }));
              setCartItems(cartItemsArray);
            } else {
              console.error("Cart items data is not an object:", cartItemsData);
            }
          });
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };
    fetchCartItems();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userId]);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.productPrice, 0);
    setTotalPrice(total);
  }, [cartItems, setTotalPrice]);

  const handleDelete = (productId) => {
    setItemToDelete(productId);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await removeItemFromCart(userId, itemToDelete);
      setCartItems(cartItems.filter(item => item.productId !== itemToDelete));
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setShowConfirmDelete(false);
  };

  const handleClickOutside = (event) => {
    if (confirmDeleteRef.current && !confirmDeleteRef.current.contains(event.target)) {
      setShowConfirmDelete(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIncrement = async (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    const selectedItem = updatedCartItems.find((item) => item.productId === productId);
    await addItemToCart(
      userId,
      selectedItem.productId,
      1,
      selectedItem.productPrice,
      selectedItem.productName,
      selectedItem.productRetailer,
      selectedItem.productImage
    );
  };

  const handleDecrement = async (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    const selectedItem = updatedCartItems.find((item) => item.productId === productId);
    await addItemToCart(
      userId,
      selectedItem.productId,
      -1,
      selectedItem.productPrice,
      selectedItem.productName,
      selectedItem.productRetailer,
      selectedItem.productImage
    );
  };

  return (
    <div className="cart-item">
      <table>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.productId}>
              <td className="information">
                <img src={cartItem.productImage} alt={cartItem.productName} />
                <div className="description">
                  <p>{cartItem.productName}</p>
                  <p>Php {cartItem.productPrice}</p>
                  <p>{cartItem.productRetailer}</p>
                </div>
              </td>
              <td className="quantity">
                <button onClick={() => handleDecrement(cartItem.productId)} disabled={cartItem.quantity <= 1}>
                  <Minus size={25} />
                </button>
                <input type="number" value={cartItem.quantity} readOnly />
                <button onClick={() => handleIncrement(cartItem.productId)}>
                  <Plus size={25} />
                </button>
              </td>
              <td>
                <p>Php {(cartItem.quantity * cartItem.productPrice).toFixed(2)}</p>
              </td>
              <td className="delete">
                <button onClick={() => handleDelete(cartItem.productId)}>
                  <Trash size={45} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {showConfirmDelete && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="confirm-delete"
            ref={confirmDeleteRef}
          >
            <div className="text">
              <h2>Remove from cart</h2>
              <p>Are you sure you want to remove this item from your cart?</p>
            </div>
            <div className="button-container">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};