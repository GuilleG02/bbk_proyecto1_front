import React, { useContext, useEffect } from 'react';
import '../assets/styles/views/home.scss'
import homeImage from '../assets/images/fondohome_rayado.png';
import { ProductsContext } from '../context/ProductsContext/ProductsState.jsx';
import { Link } from 'react-router-dom';

const Home = () => {

  const { getProducts, products } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  }, []);

  const novedades = products.slice(-3).reverse(); // últimos 3 productos

  return (
    <>
      <section
        className="home"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        {/* Aquí tu sección principal con imagen */}
      </section>

      <section className="novedades">
        <h2 className="novedades__title">Novedades</h2>
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
        <Link to="/products">
          <button className="novedades__button">Ver todo</button>
        </Link>
      </section>
    </>
  );
};


export default Home;