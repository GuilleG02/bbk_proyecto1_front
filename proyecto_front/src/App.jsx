import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Products from "./views/Products";
import TheHeader from "./components/TheHeader";
import Footer from "./components/Footer";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";

const mockCart = [
  { id: 1, name: "Producto A", price: 50, quantity: 2 },
  { id: 2, name: "Producto B", price: 30, quantity: 1 },
];

function App() {
  return (
    <Router>
      <TheHeader />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout cartItems={mockCart} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
