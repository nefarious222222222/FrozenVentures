import React, { useState, useEffect } from "react";
import "../../assets/styles/buy-product.css";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../Products";
import { Minus, Plus, X } from "phosphor-react";

export const BuyProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = PRODUCTS.find((item) => item.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  return (
    <div className="container buy-product">
      <div className="product">
        {product ? (
          <>
            <div className="right-container">
              <img src={product.productImage} />

              <div className="quantity-container">
                <Minus size={30} />
                <input type="number" />
                <Plus size={30} />
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
                  />
                  <label htmlFor="delivery">
                    Delivery<span>•</span>
                    <span>Php 10.00</span>
                  </label>
                </div>
              </form>

              <div className="button-container">
                <button>Add To Cart</button>
                <button>Place Order</button>
              </div>

              <X size={30} />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
