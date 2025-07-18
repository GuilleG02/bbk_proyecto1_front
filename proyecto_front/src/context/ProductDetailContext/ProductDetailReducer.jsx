const ProductDetailReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_PRODUCT_SUCCESS':
      return {
        ...state,
        product: action.payload,
      };
    case 'FETCH_PRODUCT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'GET_REVIEWS':
      return {
        ...state,
        reviews: action.payload,
      };
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case 'SET_REVIEW_SUBMITTING':
      return {
        ...state,
        reviewSubmitting: action.payload,
      };
    case 'SET_REVIEW_ERROR':
      return {
        ...state,
        reviewError: action.payload,
      };
    default:
      return state;
  }
};

export default ProductDetailReducer;
