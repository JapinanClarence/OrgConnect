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
import OrgAnnouncementPage from "./pages/OrgAnnouncementPage";
import AttendancePage from "./pages/AttendancePage";
import SearchPage from "./pages/SearchPage";
import usePushNotifications from "./hooks/usePushNotifications";
import TransactionPage from "./pages/TransactionPage";
import { generateToken, messaging } from "./components/notifications/firebase";
import { onMessage } from "firebase/messaging";
import { useToast } from "./hooks/use-toast";
function App() {
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate(); // React Router v6 useNavigate for redirection
  const { toast } = useToast();

  
  useEffect(() => {
    // Check if the app is running as a PWA (standalone)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
    
  }, []);

  useEffect(() =>{
    generateToken();

    onMessage(messaging, (payload) => {
      console.log(payload);
      toast({
        title: payload.notification.title,
        description: payload.notification.body,
      });
    });
  }, [])
  // usePushNotifications(); // Initialize push notifications
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
              <Route path="/attendance" element={<AttendancePage />} />
              <Route
                path="/organization/:id"
                element={<OrganizationDetailsPage />}
              />
              <Route
                path="/organization/:id/payments"
                element={<PaymentPage />}
              />
              <Route
                path="/organization/:id/transactions"
                element={<TransactionPage />}
              />
              <Route
                path="/organization/:id/officers"
                element={<OfficersPage />}
              />
              <Route path="/organization/:id/events" element={<EventsPage />} />
              <Route
                path="/organization/:id/announcements"
                element={<OrgAnnouncementPage />}
              />
              <Route path="/search" element={<SearchPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
