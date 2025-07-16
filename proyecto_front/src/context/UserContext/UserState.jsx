import { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";
const API_URL = "http://localhost:3001";

const tokenStorage = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: tokenStorage ? tokenStorage : null,
  user: null,
  error: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

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
        localStorage.setItem("token", JSON.stringify(data.token));
        await getUserInfo();
      }
      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      return false;
    }
  };

  const getUserInfo = async () => {
    try {
      const tokenStorage = JSON.parse(localStorage.getItem("token"));
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
    const token = JSON.parse(localStorage.getItem("token"));
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
