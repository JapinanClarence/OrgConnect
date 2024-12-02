import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AnnouncementPage from "./pages/AnnouncementPage";
import MembersPage from "./pages/MembersPage";
import PaymentPage from "./pages/PaymentPage";
import SettingsPage from "./pages/SettingsPage";
import OfficersPage from "./pages/OfficersPage";
import EventPage from "./pages/EventPage";
import AttendancePage from "./pages/AttendancePage";
import RegistrationPage from "./pages/RegistrationPage";
import OrganizationPage from "./pages/OrganizationPage";
import AdminAccPage from "./pages/AdminAccPage";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route
            path="/"
            element={<ProtectedRoutes allowedRoles={["superadmin", "admin"]} />}
          >
            <Route element={<DashboardLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          {/* superadmin only routes */}
          <Route
            path="/"
            element={<ProtectedRoutes allowedRoles={["superadmin"]} />}
          >
            <Route element={<DashboardLayout />}>
              <Route path="/organizations" element={<OrganizationPage />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/accounts" element={<AdminAccPage />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/register-user" element={<RegistrationPage />} />
            </Route>
          </Route>

          {/* admin only routes */}
          <Route
            path="/"
            element={<ProtectedRoutes allowedRoles={["admin"]} />}
          >
            <Route element={<DashboardLayout />}>
              <Route path="/events" element={<EventPage />} />

              <Route path="/announcements" element={<AnnouncementPage />} />

              <Route path="/payments" element={<PaymentPage />} />

              <Route path="/events/attendance" element={<AttendancePage />} />

              <Route path="/officers" element={<OfficersPage />} />

              <Route path="/members" element={<MembersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
