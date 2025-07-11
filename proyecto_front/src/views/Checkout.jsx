import React, { useState } from "react";
import "../assets/styles/views/checkout.scss";

const Checkout = ({ cartItems = [] }) => {
  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [paid, setPaid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      paymentData.cardNumber &&
      paymentData.name &&
      paymentData.expiry &&
      paymentData.cvv
    ) {
      // Simulación de procesamiento de pago
      console.log("Pago realizado con éxito:", {
        paymentData,
        cartItems,
      });
      setPaid(true);
    } else {
      alert("Completa todos los campos de pago");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (paid) {
    return (
      <div className="checkout-container">
        <h2>¡Pago exitoso!</h2>
        <p>Gracias por tu compra.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-wrapper">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h3>Información de pago</h3>
          <input
            type="text"
            name="name"
            placeholder="Nombre del titular"
            value={paymentData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Número de tarjeta"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
          />
          <div className="row">
            <input
              type="text"
              name="expiry"
              placeholder="MM/AA"
              value={paymentData.expiry}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={paymentData.cvv}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Pagar {total.toFixed(2)}€</button>
        </form>

        <div className="order-summary">
          <h3>Resumen del pedido</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x{item.quantity} — {item.price * item.quantity}€
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> {total.toFixed(2)}€
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
