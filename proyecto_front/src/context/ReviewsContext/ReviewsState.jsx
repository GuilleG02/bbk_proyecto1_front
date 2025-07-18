import React, { createContext, useReducer } from 'react';
import ReviewsReducer from './ReviewsReducer.jsx';

const API_URL = 'http://localhost:3001';

const initialState = {
  reviews: [],
};

export const ReviewsContext = createContext(initialState);

export const ReviewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReviewsReducer, initialState);

  // Traer todas las reviews (o filtradas por producto)
const getReviews = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/reviews?product_id=${productId}`);
    const data = await response.json();
    dispatch({ type: "GET_REVIEWS", payload: data });
  } catch (error) {
    console.error(error);
  }
};
    

  // Añadir review (y actualizar state)
  const addReview = async (reviewData) => {
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
      console.error(error);
      throw error;
    }
  };

  return (
    <ReviewsContext.Provider value={{
      reviews: state.reviews,
      getReviews,
      addReview,
    }}>
      {children}
    </ReviewsContext.Provider>
  );
};
