import React, {  useState, useEffect } from "react";
import "../../assets/styles/buy-product.css";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, X, WarningCircle } from "phosphor-react";
import { motion as m, AnimatePresence } from "framer-motion";

export const BuyProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [shippingMode, setShippingMode] = useState("pickup");
  const deliveryCost = 10.0;
  const shippingCost = shippingMode === "pickup" ? 0 : deliveryCost;

  const handleShippingChange = (mode) => {
    setShippingMode(mode);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(id);
    }
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

  useEffect(() => {
    const selectedProduct = PRODUCTS.find((item) => item.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duraction: 0.5 }}
      className="container buy-product"
    >
      <div className="product">
        {product ? (
          <>
            <div className="right-container">
              <img src={product.productImage} />

              <div className="quantity-container">
                <Minus size={30} onClick={decreaseQuantity} />
                <input type="number" value={quantity} readOnly />
                <Plus size={30} onClick={increaseQuantity} />
              </div>
            </div>

            <div className="left-container">
              <div className="product-info">
                <div className="group">
                  <p>Product: {product.productName}</p>
                  <p>Retailer: {product.retailerName}</p>
                  <p>Price: Php {product.price}</p>
                </div>

                <p className="desc">{product.productDescription}</p>
              </div>

              <form className="radio">
                <h3>Shipping Mode:</h3>
                <div className="radio-container">
                  <input
                    type="radio"
                    name="shipping"
                    value="pickup"
                    id="pick-up"
                    checked={shippingMode === "pickup"}
                    onChange={() => handleShippingChange("pickup")}
                  />
                  <label htmlFor="pick-up">
                    Store Pick Up<span>•</span>
                    <span>Free</span>
                  </label>

                  <input
                    type="radio"
                    name="shipping"
                    value="delivery"
                    id="delivery"
                    checked={shippingMode === "delivery"}
                    onChange={() => handleShippingChange("delivery")}
                  />
                  <label htmlFor="delivery">
                    Delivery<span>•</span>
                    <span>Php 10.00</span>
                  </label>
                </div>
              </form>

              <div className="button-container">
                <button onClick={handleAddToCart}>Add To Cart</button>
                <Link
                  to={`/order?idBuy=${id}&quantityBuy=${quantity}&shippingCost=${shippingCost}`}
                >
                  <button>Place Order</button>
                </Link>
              </div>

              <X size={30} />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <AnimatePresence>
        {showNotification && (
          <m.div
            className="notify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duraction: 0.5 }}
          >
            <WarningCircle size={50} />
            <p>
              <span>{product.productName}</span> has been added to your cart.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};
