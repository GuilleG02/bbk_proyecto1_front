import React, { useState } from "react";
import "../assets/styles/views/cart.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Producto A", price: 50, quantity: 2 },
    { id: 2, name: "Producto B", price: 30, quantity: 1 },
    { id: 3, name: "Producto C", price: 70, quantity: 3 },
  ]);

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
                <p>Precio: {item.price.toFixed(2)}€</p>
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
