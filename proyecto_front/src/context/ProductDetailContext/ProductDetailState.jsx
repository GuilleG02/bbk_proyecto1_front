import React, { createContext, useReducer } from 'react';
import ProductDetailReducer from './ProductDetailReducer.jsx';

const API_URL = 'http://localhost:3001';

const initialState = {
  product: null,
  reviews: [],
  reviewSubmitting: false,
  reviewError: null,
  error: null,
};

export const ProductDetailContext = createContext(initialState);

export const ProductDetailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductDetailReducer, initialState);

  // Traer producto por ID con sus reviews embebidas (backend debe incluirlas)
  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/id/${id}`);
      if (!response.ok) throw new Error('Error al obtener producto');
      const data = await response.json();
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: data });
      // Si el backend no incluye reviews dentro del producto, puedes llamar getReviews(id) aquí
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCT_ERROR', payload: error.message });
    }
  };

  // Obtener reviews filtrando por productId (si no están embebidas)
  const getReviews = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/reviews?product_id=${productId}`);
      if (!response.ok) throw new Error('Error al obtener reviews');
      const data = await response.json();
      dispatch({ type: 'GET_REVIEWS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_REVIEW_ERROR', payload: error.message });
    }
  };

  // Añadir review y actualizar estado
  const addReview = async (reviewData) => {
    dispatch({ type: 'SET_REVIEW_SUBMITTING', payload: true });
    dispatch({ type: 'SET_REVIEW_ERROR', payload: null });

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.error || 'Error al crear review');
      }

      const resData = await response.json();

      dispatch({
        type: 'ADD_REVIEW',
        payload: resData.review,
      });

      return resData.review;
    } catch (error) {
      dispatch({ type: 'SET_REVIEW_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_REVIEW_SUBMITTING', payload: false });
    }
  };

  return (
    <ProductDetailContext.Provider
      value={{
        product: state.product,
        reviews: state.reviews,
        reviewSubmitting: state.reviewSubmitting,
        reviewError: state.reviewError,
        error: state.error,
        fetchProduct,
        getReviews,
        addReview,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};
