
import React, { createContext, useReducer } from 'react';
import ProductsReducer from './ProductsReducer.jsx';

const API_URL = 'http://localhost:3001';

const initialState = {
  products: [],
};

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      dispatch({
        type: 'GET_PRODUCTS',
        payload: data,
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        getProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
