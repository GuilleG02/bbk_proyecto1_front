import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import '../assets/styles/views/home.scss';
import homeImage from '../assets/images/fondohome_sinrayado.png';
import { ProductsContext } from '../context/ProductsContext/ProductsState.jsx';
import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { getProducts, products } = useContext(ProductsContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getProducts();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 810);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const novedades = products.slice(-3).reverse();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,  // ACTIVAMOS flechas
  };

  return (
    <>
      <section
        className="home"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <h1 className="home__title">
          Alcanza nuevas alturas.<br />
          Tu aventura comienza aquí.
        </h1>
        <p className="home__subtitle">
          “No conquistamos las montañas, sino a nosotros mismos.”<br />
          — Sir Edmund Hillary
        </p>
        <Link to="/products">
          <button className="home__cta">Explorar productos</button>
        </Link>
      </section>

      <section className="novedades">
        <h2 className="novedades__title">Novedades</h2>

        {isMobile ? (
          <Slider {...sliderSettings}>
            {novedades.map((product) => (
              <div className="novedades__card" key={product._id}>
                <img
                  src={`/images-products/${product.image}`}
                  alt={product.name}
                  className="novedades__image"
                />
                <h3 className="novedades__name">{product.name}</h3>
                <p className="novedades__price">{product.price}€</p>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="novedades__grid">
            {novedades.map((product) => (
              <div className="novedades__card" key={product._id}>
                <img
                  src={`/images-products/${product.image}`}
                  alt={product.name}
                  className="novedades__image"
                />
                <h3 className="novedades__name">{product.name}</h3>
                <p className="novedades__price">{product.price}€</p>
              </div>
            ))}
          </div>
        )}

        <Link to="/products">
          <button className="novedades__button">Ver todo</button>
        </Link>
      </section>
    </>
  );
};

export default Home;
