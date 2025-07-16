import React, { useContext, useEffect, useState } from 'react';
import '../assets/styles/views/products.scss';
import { ProductsContext } from '../context/ProductsContext/ProductsState.jsx';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { getProducts, products } = useContext(ProductsContext);
  const navigate = useNavigate();

  // Estados para filtros
  const [maxPrice, setMaxPrice] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getProducts();
  }, []);

  // Filtrado y ordenación local (no es necesario hacerlo backend, asi es mas rapido)
  const filteredProducts = products
    .filter(p => p.price <= maxPrice)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      else return b.price - a.price;
    });

  return (
    <section className="products-view">
      <div className="products-container">
        <aside className="filters">
          <h3>Filtrar por</h3>

          <label>
            Nombre del producto:
            <input
              type="text"
              placeholder="Búsqueda"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ marginTop: '0.5rem' }}
            />
          </label>

          <label>
            Precio hasta: {maxPrice}€
            <input
              type="range"
              min="10"
              max="100"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
            />
          </label>

          <label>
            Ordenar:
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value="asc">Precio: menor a mayor</option>
              <option value="desc">Precio: mayor a menor</option>
            </select>
          </label>
        </aside>

        <div className="divider" />

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <img
                  src={`/images-products/${product.image}`}
                  alt={product.name}
                  className="product-card__image"
                />
                <h2 className="product-card__name">{product.name}</h2>
                <p className="product-card__price">{product.price}€</p>
                <button
                  className="product-card__button"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  Ver más
                </button>
              </div>
            ))
          ) : (
            <p>No se encontraron productos que coincidan.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
