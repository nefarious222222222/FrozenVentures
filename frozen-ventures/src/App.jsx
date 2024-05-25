import React from "react";
import "./assets/styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserContextProvider } from "./context/user-context";
import { AuthProvider } from "./context/auth-context";
import { OrderContextProvider } from "./context/order-context";
import { Admin } from "./pages/admin/admin";
import { AdminNavbar } from "./pages/admin/components/admin-navbar";
import { Splash } from "./Splash";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Home } from "./pages/home/home";
import { Cart } from "./pages/cart/cart";
import { Shop } from "./pages/shop/shop";
import { Sign } from "./pages/auth/sign";
import { Order } from "./pages/order/order";
import { HomeRetailer } from "./pages/seller/retailer/home-retailer";
import { Profile } from "./pages/user-menu/profile/profile";
import { Settings } from "./pages/user-menu/settings/settings";
import { UserMenu } from "./pages/user-menu/user-menu";
import { BuyProduct } from "./pages/shop/buy-product";
import { History } from "./pages/history/history";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <UserContextProvider>
          <OrderContextProvider>
            <Router>
              <AdminNavbar />
              <Navbar />
              <Routes>
                <Route path="/" element={<Splash />} />

                <Route path="/admin/*" element={<Admin />} />

                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/buy-item/:id" element={<BuyProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/history" element={<History/>} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/user-menu" element={<UserMenu />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/home-retailer/*" element={<HomeRetailer />} />
              </Routes>
              <FooterWithLocation />
            </Router>
          </OrderContextProvider>
        </UserContextProvider>
      </AuthProvider>
    </div>
  );
}

function FooterWithLocation() {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  return isHome ? <Footer /> : null;
}

export default App;
