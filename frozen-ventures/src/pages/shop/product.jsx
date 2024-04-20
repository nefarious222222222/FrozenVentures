import React, { useContext } from "react";
import "../../assets/styles/product.css";
import { ShopContext } from "../../context/shop-context";
import { Button } from "../../components/button";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="product">
      <img src={productImage} alt="Product Image" />

      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Php {price}</p>
      </div>

      <div className="button-container">
        <Button
          className="addToCartBtn"
          onClick={() => addToCart(id)}
          buttonText={"Add To Cart"}
        />
        <Button
          className="addToCartBtn"
          onClick={() => addToCart(id)}
          buttonText={"Buy Now"}
        />
      </div>
    </div>
  );
};
