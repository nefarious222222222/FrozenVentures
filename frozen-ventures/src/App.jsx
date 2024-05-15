import React from "react";
import "./assets/styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Home } from "./pages/home/home";
import { Cart } from "./pages/cart/cart";
import { Shop } from "./pages/shop/shop";
import { Items } from "./pages/items/items";
import { Sign } from "./pages/auth/sign";
import { ShopContextProvider } from "./context/shop-context";
import { AuthProvider } from "./context/auth-context";
import { Order } from "./pages/order/order";
import { HomeSeller } from "./pages/seller/home/home";
import { Profile } from "./pages/user-menu/profile/profile";
import { Settings } from "./pages/user-menu/settings/settings";
import { UserMenu } from "./pages/user-menu/user-menu";
import { BuyProduct } from "./pages/shop/buy-product";

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/seller" element={<HomeSeller />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/buy-item/:id" element={<BuyProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/items" element={<Items />} />
              <Route path="/sign" element={<Sign />} />
              <Route path="/user-menu" element={<UserMenu />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <FooterWithLocation />
          </Router>
        </ShopContextProvider>
      </AuthProvider>
    </div>
  );
}

function FooterWithLocation() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return isHome ? <Footer /> : null;
}

export default App;
