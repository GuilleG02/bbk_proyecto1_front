import React from 'react'
import '../assets/styles/views/home.scss'
import homeImage from '../assets/images/fondoHome.png';

const Home = () => {
  return (
    <section
      className="home"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="home__content">
        <h1 className="home__title">G&S Athletics</h1>
        <p className="home__subtitle">
          Tu tienda de deportes favorita. Encuentra el mejor material deportivo para rendir al máximo.
        </p>
        <button className="home__cta">Ver productos</button>
      </div>
    </section>
  );
};

export default Home;