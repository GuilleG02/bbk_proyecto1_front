import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/components/header.scss";
import Logo from "./Logo";

const TheHeader = () => {
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
            <Link to="/profile" className="header__link">
              Perfil
            </Link>
          </li>
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
          <li>
            <Link to="/checkout" className="header__link">
              Pagar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TheHeader;
