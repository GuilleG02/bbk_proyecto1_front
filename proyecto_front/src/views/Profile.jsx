import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext/UserState";
import "../assets/styles/views/profile.scss";

const Profile = () => {
  const { getUserInfo, user, error } = useContext(UserContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  if (error) return <p className="profile-container">Error: {error}</p>;
  if (!user)
    return <p className="profile-container">No has iniciado sesión.</p>;
  const orders = user.Orders || [];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Perfil de Usuario</h2>
        <p>
          <strong>Usuario:</strong> {user.name}
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
                {/* <span>Total: {order.total.toFixed(2)}€</span> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
