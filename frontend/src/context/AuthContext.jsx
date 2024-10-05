import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect users

  // Helper function to check if the token is expired
  const isTokenExpired = (decodedToken) => {
    if (decodedToken.exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
   
    if (storedData) {
      const { token, userData } = storedData;
      const decoded = jwtDecode(token);
      
      if (isTokenExpired(decoded)) {
        logout(); // Token expired, log the user out
      } else {
        setToken(token);
        setUserData(userData);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (newToken, newData) => {
    const decoded = jwtDecode(newToken);
    
    if (isTokenExpired(decoded)) {
      logout(); // Token is already expired
      return;
    }
    localStorage.setItem("userData", JSON.stringify({ token: newToken, userData: newData }));
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login on logout
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      const decoded = jwtDecode(token);

      // Automatically log out when the token expires
      const timeout = decoded.exp * 1000 - Date.now();
      const logoutTimer = setTimeout(() => {
        logout();
      }, timeout);

      return () => clearTimeout(logoutTimer); // Cleanup on component unmount or token change
    }
  }, [token, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
