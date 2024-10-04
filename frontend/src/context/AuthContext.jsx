import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storeData = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    if (storeData) {
      const { token, user } = storeData;
      setToken(token);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);

    setToken(token);

    const decoded = jwtDecode(token);

    setUserData(decoded);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
