import React from "react";
import "../assets/styles/views/profile.scss";

const Profile = () => {
  // Ejemplo para testear la página
  const user = {
    username: "amysmith",
    email: "amy@smith.com",
  };

  // Ejemplo para testear la página
  const orders = [
    { id: 1, date: "2025-07-01", total: 150.0 },
    { id: 2, date: "2025-06-20", total: 89.99 },
    { id: 3, date: "2025-05-15", total: 230.5 },
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Perfil de Usuario</h2>
        <p>
          <strong>Usuario:</strong> {user.username}
        </p>
        <p>
          <strong>Correo:</strong> {user.email}
        </p>
      </div>

      <div className="orders-section">
        <h3>Mis Pedidos</h3>
        {orders.length === 0 ? (
          <p>No tienes pedidos aún.</p>
        ) : (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <span>Pedido #{order.id}</span>
                <span>Fecha: {order.date}</span>
                <span>Total: {order.total.toFixed(2)}€</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
