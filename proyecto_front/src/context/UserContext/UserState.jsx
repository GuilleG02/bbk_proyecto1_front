import { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";
const API_URL = "http://localhost:3001";

const tokenStorage = localStorage.getItem("token");

const initialState = {
  token: tokenStorage ? tokenStorage : null,
  user: null,
  error: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    if (state.token) {
      getUserInfo(state.token);
    }
  }, [state.token]);

  const login = async (userInput) => {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      dispatch({ type: "LOGIN", payload: data });

      if (data) {
        const token = data.token;
        const userId = data.user.id;
        localStorage.setItem("token", token);
        // localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user_id", JSON.stringify(userId));

        // await getUserInfo(token);
      }
      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      return false;
    }
  };

  const getUserInfo = async (tokenArg = null) => {
    try {
      const tokenStorage = tokenArg || localStorage.getItem("token");
      if (!tokenStorage) throw new Error("Token inválido o expirado");

      const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `${tokenStorage}`,
        },
      });
      if (!res.ok) {
        throw new Error("Error al obtener la información del usuario");
      }

      const data = await res.json();
      dispatch({
        type: "GET_USER_INFO",
        payload: data,
      });
      return data;
    } catch (error) {
      console.error("getUserInfo error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
      return null;
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/users/logout`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error en logout: ${res.status}`);
      }

      const data = await res.json();
      dispatch({ type: "LOGOUT", payload: data });
      if (data) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
      }
    } catch (error) {
      console.error("Error durante el logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        error: state.error,
        login,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
