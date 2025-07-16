import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/components/header.scss";
import Logo from "./Logo";
import { UserContext } from "../context/UserContext/UserState";

const TheHeader = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Logo />
        <ul className="header__links">
          <li>
            <Link to="/" className="header__link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="header__link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="header__link">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/checkout" className="header__link">
              Pagar
            </Link>
          </li>

          {token ? (
            <>
              <li>
                <Link to="/profile" className="header__link">
                  Perfil
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="header__link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="header__link">
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default TheHeader;
