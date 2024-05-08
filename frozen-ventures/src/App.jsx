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
import { easeInOut, motion as m } from "framer-motion";

function App() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="App"
    >
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
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
    </m.div>
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
