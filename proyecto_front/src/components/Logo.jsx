import React from 'react';
import '../assets/styles/components/logo.scss';
import logoImage from '../assets/images/LogoBlanco.png';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo G&S" />
    </div>
  );
};

export default Logo;
