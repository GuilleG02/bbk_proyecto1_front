import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext/ProductsState.jsx";
import { UserProvider } from "./context/UserContext/UserState";
import { CartProvider } from "./context/CartContext/CartState.jsx";
import { ReviewsProvider } from "./context/ReviewsContext/ReviewsState.jsx";
import { ProductDetailProvider } from "./context/ProductDetailContext/ProductDetailState.jsx"; // ✅ Importa el nuevo Provider

import "./App.css";
import Home from "./views/Home";
import Products from "./views/Products";
import ProductDetail from "./views/ProductDetail";
import TheHeader from "./components/TheHeader";
import Footer from "./components/Footer";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";

function App() {
  return (
    <ProductsProvider>
      <UserProvider>
        <CartProvider>
          <ReviewsProvider>
            <Router>
              <TheHeader />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route
                    path="/products/:id"
                    element={
                      <ProductDetailProvider>
                        <ProductDetail />
                      </ProductDetailProvider>
                    }
                  />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<Cart />} />
                  {/* <Route path="/checkout" element={<Checkout cartItems={mockCart} />} /> */}
                </Routes>
              </main>
              <Footer />
            </Router>
          </ReviewsProvider>
        </CartProvider>
      </UserProvider>
    </ProductsProvider>
  );
}

export default App;
