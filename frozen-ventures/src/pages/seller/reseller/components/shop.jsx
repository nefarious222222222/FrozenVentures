import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../../../context/user-context";
import { fetchProductsBasedOnUserRole } from "../../../../firebase/firebase-products";

export const Shop = () => {
  const { user } = useContext(UserContext);
  const userRole = user.userRole;

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const databaseProducts = await fetchProductsBasedOnUserRole(userRole);
        const formattedProducts = databaseProducts.map((product) => ({
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          shopName: product.shopName,
          productImage: product.productImage,
          productDescription: product.productDescription,
          productSize: product.productSize,
          productStock: product.productStock,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [userRole]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleBuyProduct = () => {
    // Implement the buy logic here
    console.log("Buy product:", selectedProduct);
  };

  const handleAddToCart = () => {
    // Implement the add to cart logic here
    console.log("Add to cart:", selectedProduct);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePopup();
      }
    };

    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct]);

  return (
    <div className="shop-reseller">
      <div className="search-bar">
        <h1>Shop</h1>
        <input type="text" placeholder="Search" />
      </div>

      <div className="product-container">
        {products.map((product) => (
          <div key={product.productId}>
            <div className="product-card" onClick={() => handleProductClick(product)}>
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
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="popup">
          <div className="popup-content" ref={popupRef}>
            <h2>{selectedProduct.productName}</h2>
            <img src={selectedProduct.productImage} alt={selectedProduct.productName} />
            <p><strong>Price:</strong> Php {selectedProduct.productPrice}</p>
            <p><strong>Shop:</strong> {selectedProduct.shopName}</p>
            <p><strong>Size:</strong> {selectedProduct.productSize}</p>
            <p><strong>Stock:</strong> {selectedProduct.productStock}</p>
            <p><strong>Description:</strong> {selectedProduct.productDescription}</p>
            <div className="button-group">
              <button onClick={handleBuyProduct}>Buy</button>
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};