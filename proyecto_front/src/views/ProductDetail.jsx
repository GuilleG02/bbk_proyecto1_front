import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext/CartState.jsx";
import '../assets/styles/views/productDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(""); // 👈 mensaje
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/id/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
      setAddedMessage(`${quantity} unidad(es) de "${product.name}" añadida(s) al carrito ✅`);

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setAddedMessage(""), 3000);
    }
  };

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <section className="product-detail">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Volver atrás"
      >
        ← Volver
      </button>

      <div className="product-info">
        <img
          src={`/images-products/${product.image}`}
          alt={product.name}
          className="product-image"
        />
        <div className="product-meta">
          <h1>{product.name}</h1>
          {/* ✅ Mensaje HTML */}
          {addedMessage && <p className="added-message">{addedMessage}</p>}
          <p className="price">{product.price}€</p>
          <p className="category">Categoría: {product.Category?.name || 'Sin categoría'}</p>

          <label className="quantity-selector">
            Cantidad:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>

          <button className="add-to-cart" onClick={handleAddToCart}>
            Añadir al carrito
          </button>

        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
