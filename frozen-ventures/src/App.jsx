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
import { Sign } from "./pages/auth/sign";
import { ShopContextProvider } from "./context/shop-context";
import { Order } from "./pages/order/order";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route
              path="/sign/*"
              element={
                <WithoutNavbar>
                  <Sign />
                </WithoutNavbar>
              }
            />
          </Routes>
          <FooterWithLocation />
        </Router>
      </ShopContextProvider>
    </div>
  );
}

function FooterWithLocation() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return isHome ? <Footer /> : null;
}

function WithoutNavbar({ children }) {
  return children;
}

export default App;
