import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/user-context";
import { DropZone } from "../../../../components/drop-zone";
import { X } from "phosphor-react";
import {
  addProduct,
  fetchAllProducts,
  fetchLowStockProducts,
} from "../../../../firebase/firebase-retailers";

export const ProductList = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const shopName = user.userShopName;

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [products, setProducts] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await fetchAllProducts(userId);
        if (allProducts) {
          setProducts(Object.values(allProducts));
        }

        const lowStockProducts = await fetchLowStockProducts(userId);
        if (lowStockProducts.length > 0) {
          const productNames = lowStockProducts.map(product => product.productName).join(", ");
          setLowStockAlert(`${productNames} has below 20 stocks`);
        } else {
          setLowStockAlert("");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [userId]);

  const toggleAddProduct = () => {
    setShowAddProduct((prev) => !prev);
    setError(null);
    setSuccess(null);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!productName || !productPrice || !productStock || !productDescription) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      console.log("Adding product:", {
        userId,
        productName,
        productPrice,
        productStock,
        productDescription,
        productImage,
        shopName,
      });

      await addProduct(userId, {
        productName,
        productPrice,
        productStock,
        productDescription,
        productImage,
        shopName,
      });

      setProductName("");
      setProductPrice("");
      setProductStock("");
      setProductDescription("");
      setProductImage("");
      setShowAddProduct(false);
      setError(null);
      setSuccess("Product added successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="product-list">
      <div className="products">
        {success && (
          <div className="success-message">
            <p>{success}</p>
          </div>
        )}
        {lowStockAlert && (
          <div className="alert-message">
            <p>{lowStockAlert}</p>
          </div>
        )}

        <div className="header">
          <h1>Product List</h1>
          <button onClick={toggleAddProduct}>Add Product</button>
        </div>

        <div className="list-items">
          {products.map((product) => (
            <div className="product" key={product.productId}>
              <h2>Product Id: {product.productId}</h2>
              <div className="product-info">
                <img src={product.productImage || "default-image.png"} alt="Product" />
                <div className="product-description">
                  <h3>{product.productName}</h3>
                  <p>Price: Php {product.productPrice}</p>
                  <p>Stock: {product.productStock}</p>
                  <button>Restock</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddProduct && (
        <form className="add-product" onSubmit={handleAddProduct}>
          <h1>Release New Product</h1>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          <X size={30} onClick={toggleAddProduct} />
          <div className="product-image">
            <DropZone setImage={setProductImage} setError={setError} />
          </div>

          <div className="input-container">
            <div className="group-field">
              <div className="input-field">
                <label htmlFor="productName">Name:</label>
                <input
                  name="productName"
                  id="productName"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="productPrice">Price:</label>
                <input
                  name="productPrice"
                  id="productPrice"
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="productStock">Stock:</label>
              <input
                name="productStock"
                id="productStock"
                type="text"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="productDescription">Description:</label>
              <textarea
                name="productDescription"
                id="productDescription"
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Add Product</button>
        </form>
      )}
    </div>
  );
};
