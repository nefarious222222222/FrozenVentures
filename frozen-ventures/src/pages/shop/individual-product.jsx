import React, { useContext, useState, useEffect } from "react";
import "../../assets/styles/individual-product.css";
import { UserContext } from "../../context/user-context";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductByProductId,
  setCartItemQuantity,
} from "../../firebase/firebase-products";
import {
  ArrowRight,
  Minus,
  Plus,
  UserCircle,
  WarningCircle,
} from "phosphor-react";
import { motion as m, AnimatePresence } from "framer-motion";

export const IndividualProduct = () => {
  const { user } = useContext(UserContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [quantity, setQuantity] = useState(1); // Initial quantity

  const userId = user.userId;

  console.log(userId);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await fetchProductByProductId(productId);
      setProduct(productData);
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    if (product.productStock > 0) {
      await setCartItemQuantity(
        userId,
        productId,
        quantity,
        product.productPrice,
        product.productName,
        product.shopName,
        product.productImage,
        product.productStock
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/cart");
      }, 3000);
    } else {
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.productStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleInputChange = (e) => {
    let newQuantity = parseInt(e.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= product.productStock
    ) {
      setQuantity(newQuantity);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container individual-product"
    >
      {product && (
        <div className="product-details">
          <div className="header">
            <div className="seller">
              <UserCircle size={60} />
              <p>{product.shopName}</p>
            </div>
            <ArrowRight size={50} />
          </div>

          <div className="product">
            <img src={product.productImage} alt={product.productName} />

            <div className="product-info">
              <div className="info">
                <p className="name">{product.productName}</p>
                <p className="price">Php {product.productPrice}</p>
              </div>

              <div className="info">
                <div className="group">
                  <p>
                    <span>Flavor:</span> {product.productName}
                  </p>
                  <p>
                    <span>Size:</span> {product.productSize}
                  </p>
                  <p>
                    <span>Stocks:</span> {product.productStock}
                  </p>
                </div>

                <div className="quantity-container">
                  <span>Quantity:</span>

                  <div className="quantity">
                    <button onClick={handleDecrement} disabled={quantity <= 1}>
                      <Minus size={25} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleInputChange}
                      min="1"
                      max={product.productStock}
                    />
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= product.productStock}
                    >
                      <Plus size={25} />
                    </button>
                  </div>
                </div>

                <p className="description">{product.productDescription}</p>
              </div>
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button>Buy Now</button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showNotification && product && (
          <m.div
            className="notify success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WarningCircle size={50} />
            <p>
              <span>{product.productName}</span> has been added to your cart.
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showErrorNotification && product && (
          <m.div
            className="notify error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WarningCircle size={50} />
            <p>
              <span>{product.productName}</span> is out of stock.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};
