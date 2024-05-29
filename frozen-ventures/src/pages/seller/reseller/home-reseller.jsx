import React, { useContext, useState } from "react";
import "../../../assets/styles/reseller.css";
import { UserContext } from "../../../context/user-context";
import { useAuth } from "../../../context/auth-context";
import { Navigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { ShopPerformance } from "./components/shop-performance";
import { Shop } from "./components/shop";
import { Cart } from "./components/cart";
import { History } from "./components/history";
import { ManageOrder } from "./components/manage-order";
import { ManageProducts } from "./components/manage-products";
import { ManageInventory } from "./components/manage-inventory";

export const HomeSeller = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("performance");

  const handleActiveItemChange = (item) => {
    setActiveItem(item);
  };

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  if (!userSignedIn || (userSignedIn && user.userRole !== "Retailer")) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div className="container home-retailer">
      <Sidebar
        activeItem={activeItem}
        onActiveItemChange={handleActiveItemChange}
        onToggle={handleSidebarToggle}
      />

      <div className="sidebar-content" style={{ marginLeft: isSidebarExpanded ? "15vw" : "5vw" }}>
        {activeItem === "performance" && <ShopPerformance />}
        {activeItem === "shop" && <Shop />}
        {activeItem === "cart" && <Cart />}
        {activeItem === "history" && <History />}
        {activeItem === "manage-order" && <ManageOrder />}
        {activeItem === "manage-products" && <ManageProducts />}
        {activeItem === "manage-inventory" && <ManageInventory />}
      </div>
    </div>
  );
};