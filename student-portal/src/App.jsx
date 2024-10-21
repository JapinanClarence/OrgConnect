import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
