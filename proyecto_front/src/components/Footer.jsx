import React from 'react';
import '../assets/styles/components/footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          © {new Date().getFullYear()} G&S Athletics. Todos los derechos reservados.
        </p>
        <ul className="footer__links">
          <li><a href="/about">Sobre nosotros</a></li>
          <li><a href="/products">Productos</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
