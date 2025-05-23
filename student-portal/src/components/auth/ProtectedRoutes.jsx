import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Check if the authentication status is still loading
  if (isLoading) {
    return <div className="h-screen my-auto mx-auto"></div>;
  }
 
  // Render the child routes if authenticated, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/welcome" />;
};

export default ProtectedRoute;
