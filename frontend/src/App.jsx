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
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route
              element={
                <ProtectedRoutes allowedRoles={["superadmin", "admin"]} />
              }
            >
              <Route index element={<HomePage />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes allowedRoles={["superadmin", "admin"]} />
              }
            >
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/events" element={<EventPage />} />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/announcements" element={<AnnouncementPage />} />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/payments" element={<PaymentPage />} />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/events/attendance" element={<AttendancePage />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/officers" element={<OfficersPage />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/members" element={<MembersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
