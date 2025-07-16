const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        error: null,
      };
    case "GET_USER_INFO":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
