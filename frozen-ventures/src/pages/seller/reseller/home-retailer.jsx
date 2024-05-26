import React, { useContext, useState } from "react";
import "../../../assets/styles/retailer.css";
import { UserContext } from "../../../context/user-context";
import { useAuth } from "../../../context/auth-context";
import { Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { ShopPerformance } from "./components/shop-performance";
import { Shop } from "./components/shop";

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
      </div>
    </div>
  );
};