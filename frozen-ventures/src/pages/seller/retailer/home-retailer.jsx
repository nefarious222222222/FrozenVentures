import React, { useContext, useState, useEffect } from "react";
import "../../../assets/styles/retailer.css";
import { UserContext } from "../../../context/user-context";
import { useAuth } from "../../../context/auth-context";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { OrderList } from "./components/order-list";
import { ProductList } from "./components/product-list";
import { RestockRetailer } from "./components/restock-retailer";
import { getProductMetrics, fetchNewProductsThisWeek } from "../../../firebase/firebase-retailers";

export const HomeRetailer = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const location = useLocation();

  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalStocks: 0,
    outOfStockCount: 0,
  });
  const [newProductsThisWeek, setNewProductsThisWeek] = useState(0);

  useEffect(() => {
    if (userSignedIn && user.userRole === "Retailer") {
      getProductMetrics(user.userId)
        .then(setMetrics)
        .catch(console.error);

      fetchNewProductsThisWeek(user.userId)
        .then((products) => setNewProductsThisWeek(products.length))
        .catch(console.error);
    }
  }, [userSignedIn, user.userRole, user.userId]);

  if (!userSignedIn || (userSignedIn && user.userRole !== "Retailer")) {
    return <Navigate to={"/"} replace={true} />;
  }

  const isHomeRetailerPath = location.pathname === "/home-retailer";

  return (
    <div className="container home-retailer">
      <Routes>
        <Route path="order-list" element={<OrderList />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="restock-retailer" element={<RestockRetailer />} />
      </Routes>
      {isHomeRetailerPath && (
        <div className="side-bar">
          <h1>Products Information</h1>
          <div className="informations">
            <p>
              Total Products: <span>{metrics.totalProducts}</span>
            </p>
            <p>
              Total Stocks: <span>{metrics.totalStocks}</span>
            </p>
            <p>
              Out of Stock: <span>{metrics.outOfStockCount}</span>
            </p>
            <p>
              New Products This Week: <span>{newProductsThisWeek}</span>
            </p>
            <p>
              Most Popular: <span>Vanilla Ice Cream</span>
            </p>
            <p>
              Least Stocked: <span>Mango Sorbet</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
