import React, { useEffect, useState } from 'react';
import '../assets/styles/views/products.scss';
import PelotaFutbol from '../assets/images-products/PelotaFutbol.mp4'
import PelotaBasket from '../assets/images-products/PelotaBasket.mp4'

const Products = () => {
    // Simulación de productos (puedes reemplazar esto por datos del backend)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Simulación de fetch desde backend
       const mockData = [
  {
    id: 1,
    name: 'Pelota de Futbol',
    video: PelotaFutbol
  },
  {
    id: 2,
    name: 'Pelota de Basket',
    video: PelotaBasket
  },
  {
    id: 3,
    name: 'PelotaFutbol',
    video: PelotaFutbol
  }
];

        setProducts(mockData);
    }, []);

    return (
        <section className="products">
            <h1 className="products__title">Productos</h1>
            <div className="products__grid">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <video
  className="product-card__video"
  src={product.video}
  autoPlay
  loop
  muted
  playsInline
/>
                        <h2 className="product-card__name">{product.name}</h2>
                        <button className="product-card__button">Ver más</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Products;
