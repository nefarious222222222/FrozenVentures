import React, { useState, useEffect } from "react";
import "../../assets/styles/product.css";
import { motion as m, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchAllProductsFromRetailers } from "../../firebase/firebase-products";

export async function getProductsFromDatabase() {
  try {
    const databaseProducts = await fetchAllProductsFromRetailers();
    const products = databaseProducts.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      shopName: product.shopName,
      productImage: product.productImage,
      productDescription: product.productDescription,
      productSize: product.productSize,
      productStock: product.productStock,
    }));
    return products;
  } catch (error) {
    console.error("Error converting database products data:", error);
    return [];
  }
}

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsFromDatabase = await getProductsFromDatabase();
      setProducts(productsFromDatabase);
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      {products.map((product) => (
        <Link
          to={`/individual-product/${product.productId}`}
          key={product.productId}
          style={{ textDecoration: "none" }}
        >
          <div className="product-card">
            <img src={product.productImage} alt={product.productName} />
            <div className="product-box">
              <div className="product-info">
                <div className="info-group">
                  <p className="name">{product.productName}</p>
                  <p>{product.shopName}</p>
                </div>
                <div className="info-group">
                  <p className="price">Php {product.productPrice}</p>
                  <p>{product.productSize}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
