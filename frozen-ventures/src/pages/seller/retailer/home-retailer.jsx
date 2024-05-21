import React, { useContext } from "react";
import "../../../assets/styles/retailer.css";
import { UserContext } from "../../../context/user-context";
import { useAuth } from "../../../context/auth-context";
import { easeInOut, motion as m } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { OrderList } from "./components/order-list";
import { ProductList } from "./components/product-list";
import { RestockRetailer } from "./components/restock-retailer";

export const HomeRetailer = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const location = useLocation();

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
              Total Products: <span>15</span>
            </p>
            <p>
              Total Stocks: <span>1000</span>
            </p>
            <p>
              New Products This Week: <span>3</span>
            </p>
            <p>
              Out of Stock: <span>2</span>
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
