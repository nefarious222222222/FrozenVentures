import React, { useContext, useState, useEffect } from "react";
import "../assets/styles/navbar.css";
import { UserContext } from "../context/user-context";
import { useAuth } from "../context/auth-context";
import logo from "../assets/images/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import {
  Storefront,
  ShoppingCart,
  UserCircle,
  Cube,
  Bell,
} from "phosphor-react";
import { Notifications } from "../pages/seller/reseller/components/notifications";
import { getProductsBelow20Stock } from "../firebase/firebase-reseller";

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();

  const userRole = user?.userRole;
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  const isSignInPage = location.pathname === "/sign";
  const isAdminPage = location.pathname === "/admin";
  const isAdminsPage = location.pathname.startsWith("/admin");

  const [showNotifications, setShowNotifications] = useState(false);
  const [productsBelow20, setProductsBelow20] = useState([]);

  useEffect(() => {
    const fetchProductsBelow20 = async () => {
      try {
        const below20Stock = await getProductsBelow20Stock(user.userRole, user.userId);
        setProductsBelow20(below20Stock);
      } catch (error) {
        console.error("Error fetching products with stock below 20:", error);
      }
    };
  
    fetchProductsBelow20();
  }, [user]); 

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  if (isSignInPage || isAdminPage || isAdminsPage) {
    return null;
  }

  return showNavbar ? (
    <div className="navbar">
      <div className="title-container">
        <Link
          className="link-container"
          to={userRole === "Retailer" ? "/home-reseller" : "/home"}
        >
          <img src={logo} alt="Sharsh" />
          <p className="link title">FrozenVentures</p>
        </Link>
      </div>

      {!userSignedIn || (userSignedIn && user?.userRole === "Customer") ? (
        <input type="text" placeholder="Search" />
      ) : null}

      <div className="links">
        {!userSignedIn || (userSignedIn && user?.userRole === "Customer") ? (
          <Link to="/shop" title="Shop">
            <Storefront className="link fake-button" size={32} color={"#fff"} />
          </Link>
        ) : null}

        {userSignedIn && user.userRole === "Retailer" ? (
          <div
            className={`notif-container ${
              productsBelow20.length > 0 ? "has-notifications" : ""
            }`}
          >
            <Bell
              className={"link fake-button"}
              size={30}
              color={"#fff"}
              onClick={toggleNotifications}
            />
            {productsBelow20.length > 0 && <div className="red-dot"></div>}
          </div>
        ) : null}

        {userSignedIn && user.userRole === "Customer" ? (
          <>
            <Link to="/cart" title="Cart">
              <ShoppingCart
                className="link fake-button"
                size={30}
                color={"#fff"}
              />
            </Link>

            <Link to="/history" title="History">
              <Cube className="link fake-button" size={30} color={"#fff"} />
            </Link>
          </>
        ) : null}

        {userSignedIn ? (
          <Link to="/user-menu" title="User Menu">
            <UserCircle className="link fake-button" size={35} color={"#fff"} />
          </Link>
        ) : (
          <Link to="/sign">
            <button>Sign In</button>
          </Link>
        )}
      </div>
      {showNotifications && <Notifications />}
    </div>
  ) : null;
};
