import React, { useState, useEffect } from "react";
import "../assets/styles/views/cart.scss";
// import { ProductsContext } from "../context/ProductsContext/ProductsState";

const Cart = () => {
  // --> Modificar cuando tenga ProductsContext
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/products"); // Cambia por tu URL real
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        const productsWithQuantity = data.map((product) => ({
          ...product,
          quantity: 1,
        }));
        setCartItems(productsWithQuantity);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  //Hasta aquí --> Modificar cuando tenga ProductsContext

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Pedido realizado:", cartItems);
    alert("¡Pedido enviado!");
    // Aquí podrías enviar los datos a una API y vaciar el carrito
    setCartItems([]);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="info">
                <h4>{item.name}</h4>
                <p>Precio: {parseFloat(item.price).toFixed(2)}€</p>
                <div className="quantity">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
              <button className="remove" onClick={() => handleRemove(item.id)}>
                Eliminar
              </button>
            </div>
          ))}
          <div className="cart-total">
            <p>
              <strong>Total:</strong> {total.toFixed(2)}€
            </p>
            <button className="checkout" onClick={handleCheckout}>
              Realizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
