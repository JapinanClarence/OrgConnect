import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";
import SecondaryLayout from "./layout/SecondaryLayout";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import QrPage from "./pages/QrPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import { Toaster } from "./components/ui/toaster";
import AnnouncementPage from "./pages/AnnouncementPage";
import OrganizationDetailsPage from "./pages/OrganizationDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import OfficersPage from "./pages/OfficersPage";
import EventsPage from "./pages/EventsPage";

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
    <>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/qr" element={<QrPage />} />
              <Route path="/announcements" element={<AnnouncementPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Route>

            <Route path="/" element={<SecondaryLayout />}>
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/organization" element={<OrganizationsPage />} />
              <Route
                path="/organization/:id"
                element={<OrganizationDetailsPage />}
              />
              <Route
                path="/organization/:id/payments"
                element={<PaymentPage />}
              />
              <Route
                path="/organization/:id/officers"
                element={<OfficersPage />}
              />
              <Route
                path="/organization/:id/events"
                element={<EventsPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
