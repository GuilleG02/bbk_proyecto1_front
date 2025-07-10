import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./views/Home";
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
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
      <Register />
      <Login />
      <Profile />
      <Cart />
      <Checkout cartItems={mockCart} />
    </>
  );
}

export default App;
