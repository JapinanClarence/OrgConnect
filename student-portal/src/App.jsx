import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import QrPage from "./pages/QrPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
function App() {
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate(); // React Router v6 useNavigate for redirection

  useEffect(() => {
    // Check if the app is running as a PWA (standalone)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    } 
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/qr" element={<QrPage />} />
            <Route path="/organization" element={<OrganizationsPage />} />
            <Route path="/event" element={<EventsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
