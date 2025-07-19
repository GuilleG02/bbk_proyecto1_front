import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext/CartState.jsx";
import "../assets/styles/views/cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } =
    useContext(CartContext);

  // Asumiendo IVA del 21%
  const iva = total * 0.21;
  const subtotal = total - iva;

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

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
                <div className="product-header">
                  <h4>{item.name}</h4>
                  <p className="price">{parseFloat(item.price).toFixed(2)}€</p>
                </div>
                <div className="quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button
                className="remove"
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="cart-total">
            <p>
              <strong>Subtotal:</strong> {subtotal.toFixed(2)}€
            </p>
            <p>
              <strong>IVA (21%):</strong> {iva.toFixed(2)}€
            </p>
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
