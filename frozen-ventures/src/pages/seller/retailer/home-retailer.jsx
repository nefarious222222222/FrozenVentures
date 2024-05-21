import React, { useContext } from "react";
import { UserContext } from "../../../context/user-context";
import { useAuth } from "../../../context/auth-context";
import { easeInOut, motion as m } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import { OrderList } from "./components/order-list";
import { ProductList } from "./components/product-list";
import { RestockRetailer } from "./components/restock-retailer";

export const HomeRetailer = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();

  if (!userSignedIn || (userSignedIn && user.userRole !== "Retailer")) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div className="container home-retailer">
      <Routes>
        <Route path="order-list" element={<OrderList />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="restock-retailer" element={<RestockRetailer />} />
      </Routes>
    </div>
  );
};
