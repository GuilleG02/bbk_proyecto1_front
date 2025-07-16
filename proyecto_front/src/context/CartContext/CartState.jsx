import React, { createContext, useReducer, useEffect } from "react";
import CartReducer from "./CartReducer.jsx";

const localStorageKey = "myAppCart";

const getInitialCart = () => {
  const savedCart = localStorage.getItem(localStorageKey);
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  cart: getInitialCart(),
};

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product, quantity) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const updateQuantity = (id, delta) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, delta },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
