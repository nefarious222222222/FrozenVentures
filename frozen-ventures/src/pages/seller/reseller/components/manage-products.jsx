import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../context/user-context";
import { fetchSellerProducts } from "../../../../firebase/firebase-reseller";

export const ManageProducts = () => {
  const { user } = useContext(UserContext);
  const userId = user.userId;
  const userRole = user.userRole;

  const [products, setProducts] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchSellerProducts(userRole, userId);
      setProducts(fetchedProducts);
    };

    getProducts();
  }, [userRole, userId]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="manage-products">
      <div className="header">
        <h1>Manage Products</h1>
        <button>Add Product</button>
      </div>

      <div className="products-container">
        {Object.keys(products).length > 0 ? (
          Object.keys(products).map((productId) => (
            <div key={productId} className="product-item">
              <div className="product-info">
                <p>
                  <span>Product Id:</span> {productId}
                </p>
                <p>
                  <span>Date Added:</span>{" "}
                  {formatDate(products[productId].dateAdded)}
                </p>
              </div>

              <div className="product">
                <img src={products[productId].productImage} />

                <div className="product-text">
                  <div className="info">
                    <p><span>Product Name: </span>{products[productId].productName}</p>
                    <p><span>Product Price: </span>Php {products[productId].productPrice}</p>
                    <p><span>Stock:</span> {products[productId].productStock}</p>
                  </div>
                  <p className="description">
                    {products[productId].productDescription}
                  </p>
                </div>

                <button>Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};
