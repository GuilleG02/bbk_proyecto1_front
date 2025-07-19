import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext/CartState";
import { useNavigate } from "react-router-dom";
import "../assets/styles/views/checkout.scss";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [paid, setPaid] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem("user_id"));
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("ID de usuario no disponible");
    }
  }, []);

  //FORMATEAR CAMPOS
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 20);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length < 3) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  };

  const formatCVV = (value) => value.replace(/\D/g, "").slice(0, 3);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (name === "cvv") {
      formattedValue = formatCVV(value);
    }

    setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  //VALIDAR CAMPOS
  const validateForm = () => {
    const errors = {};
    const number = paymentData.cardNumber.replace(/\s/g, "");
    const [month, year] = paymentData.expiry.split("/");

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!paymentData.name.trim()) {
      errors.name = "El nombre es obligatorio";
    }

    if (number.length !== 20) {
      errors.cardNumber = "El número debe tener 20 dígitos";
    }

    if (!/^\d{2}\/\d{2}$/.test(paymentData.expiry)) {
      errors.expiry = "Formato MM/AA";
    } else {
      const mm = parseInt(month);
      const yy = parseInt(year);

      if (mm < 1 || mm > 12) {
        errors.expiry = "El mes debe estar entre 01 y 12";
      } else if (
        yy < currentYear ||
        (yy === currentYear && mm < currentMonth)
      ) {
        errors.expiry = "La tarjeta está expirada";
      }
    }

    if (paymentData.cvv.length !== 3) {
      errors.cvv = "El CVV debe tener 3 dígitos";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      const order = {
        products: cartItems.map((item) => item.id),
        user_id: userId,
      };

      // ENVIAR PEDIDO A LA API
      try {
        const response = await fetch("http://localhost:3001/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        if (!response.ok) {
          throw new Error(`Error al realizar el pedido: ${response.status}`);
        }

        setPaid(true);
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Error al realizar el pedido:", error);
      }
    }
  };

  useEffect(() => {
    const errors = validateForm();
    setFormErrors(errors);
  }, [paymentData]);

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
      <h2>PASARELA DE PAGO</h2>
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
          {formErrors.name && <p className="error">{formErrors.name}</p>}

          <input
            type="text"
            name="cardNumber"
            placeholder="Número de tarjeta"
            value={paymentData.cardNumber}
            onChange={handleChange}
            inputMode="numeric"
            autoComplete="cc-number"
            required
          />
          {formErrors.cardNumber && (
            <p className="error">{formErrors.cardNumber}</p>
          )}

          <div className="row">
            <div className="input-group">
              <input
                type="text"
                name="expiry"
                placeholder="MM/AA"
                value={paymentData.expiry}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="cc-exp"
                required
              />
              {formErrors.expiry && (
                <p className="error">{formErrors.expiry}</p>
              )}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentData.cvv}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="cc-csc"
                required
              />
              {formErrors.cvv && <p className="error">{formErrors.cvv}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={Object.keys(validateForm()).length > 0}
          >
            Pagar {total.toFixed(2)}€
          </button>
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
