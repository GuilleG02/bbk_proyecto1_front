const ReviewsReducer = (state, action) => {
  switch(action.type) {
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
    default:
      return state;
  }
};

export default ReviewsReducer;
