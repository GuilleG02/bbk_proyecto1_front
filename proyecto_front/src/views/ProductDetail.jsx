import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext/CartState.jsx";
import { ReviewsContext } from "../context/ReviewsContext/ReviewsState.jsx";
import { ProductDetailContext } from "../context/ProductDetailContext/ProductDetailState.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../assets/styles/views/productDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewError, setReviewError] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { product, fetchProduct } = useContext(ProductDetailContext);
  const { reviews, getReviews, addReview } = useContext(ReviewsContext);

  useEffect(() => {
    fetchProduct(id);
    getReviews(id); // Cargar reviews del contexto
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (product) {
      setIsFavorite(storedFavorites.includes(product.id));
    }
  }, [product]);

  const storedUserId = JSON.parse(localStorage.getItem("user_id"));

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(
        (favId) => favId !== product.id
      );
    } else {
      updatedFavorites = [...storedFavorites, product.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
      setAddedMessage(
        `${quantity} unidad(es) de "${product.name}" añadida(s) al carrito ✅`
      );
      setTimeout(() => setAddedMessage(""), 3000);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSubmitting(true);

    try {
      const userId = storedUserId || null;

      await addReview({
        content: reviewContent,
        rating: reviewRating,
        user_id: userId,
        product_id: product.id,
      });

      setReviewContent("");
      setReviewRating(5);
      getReviews(product.id); // Actualiza reviews tras añadir
    } catch (error) {
      setReviewError(error.message);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <section className="product-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="product-info">
        <img
          src={`/images-products/${product.image}`}
          alt={product.name}
          className="product-image"
        />
        <div className="product-meta">
          <div className="product-title">
            <h1>{product.name}</h1>
            <button
              className={`favorite-button ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
              aria-label="Añadir a favoritos"
            >
              ★
            </button>
          </div>

          {addedMessage && <p className="added-message">{addedMessage}</p>}
          <p className="price">{product.price}€</p>
          <p className="category">
            Categoría: {product.Category?.name || "Sin categoría"}
          </p>

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

      <div className="reviews-section">
        <h2>Reseñas</h2>

        <form onSubmit={handleReviewSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="review-content">Comentario:</label>
            <textarea
              id="review-content"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
              placeholder="Escribe tu reseña aquí..."
            />
          </div>

          <div className="form-group rating-group">
            <label htmlFor="review-rating">Valoración:</label>
            <select
              id="review-rating"
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              required
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} estrella{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={reviewSubmitting}>
              {reviewSubmitting ? "Enviando..." : "Enviar reseña"}
            </button>
            {reviewError && <p className="error-message">{reviewError}</p>}
          </div>
        </form>

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-item">
                <p className="review-header">
                  <strong>{review.user?.name || "Anónimo"}</strong>
                  <span className="review-rating">
                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                  </span>
                </p>

                <p className="review-content">{review.content}</p>

                {storedUserId === review.user_id && (
                  <div className="review-actions">
                    <button
                      className="edit-btn"
                      title="Editar reseña"
                      onClick={() => console.log("Editar reseña", review.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      title="Eliminar reseña"
                      onClick={() => console.log("Eliminar reseña", review.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No hay reseñas aún.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
