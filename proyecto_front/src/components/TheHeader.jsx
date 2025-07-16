import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "../assets/styles/components/header.scss";
import Logo from "./Logo";
import { UserContext } from "../context/UserContext/UserState";

const TheHeader = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo-link">
          <Logo />
        </Link>

        <ul className="header__links">
          <li>
            <Link to="/" className="header__link">Home</Link>
          </li>
          <li>
            <Link to="/products" className="header__link">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="header__link">
              <FaShoppingCart size={20} />
            </Link>
          </li>
          <li ref={dropdownRef}>
            <button className="profile-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUser size={20} />
            </button>
            {dropdownOpen && (
              <ul className="profile-dropdown">
                {token ? (
                  <>
                    <li>
                      <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Registrarse
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TheHeader;
