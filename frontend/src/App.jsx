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
import SettingsPage from "./pages/SettingsPage";
import OfficersPage from "./pages/OfficersPage";
import EventPage from "./pages/EventPage";
import AttendancePage from "./pages/AttendancePage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminAccPage from "./pages/AdminAccPage";
import AcademicYearPage from "./pages/AcademicYearPage";
import MembersPaidPage from "./pages/MembersPaidPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import CalendarPage from "./pages/CalendarPage";
import ExpenditurePage from "./pages/ExpenditurePage";
import FeesPage from "./pages/FeesPage";
import PaymentLogsPage from "./pages/PaymentLogsPage";
import OrganizationPage from "./pages/OrganizationPage";
import AccountsPage from "./pages/AccountsPage";
// import TestPage from "./pages/TestPage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/test" element={<TestPage />} /> */}
          </Route>

          <Route
            path="/"
            element={
              <ProtectedRoutes
                allowedRoles={[
                  "superadmin",
                  "admin",
                  "secretary",
                  "treasurer",
                  "auditor",
                ]}
              />
            }
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
              <Route path="/academicYear" element={<AcademicYearPage />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/accounts" element={<AdminAccPage />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/organizations" element={<OrganizationsPage />} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route path="/organization/:id" element={<OrganizationPage />} />
            </Route>
          </Route>

          {/* admin and sub-admin only routes */}
          <Route
            path="/"
            element={
              <ProtectedRoutes
                allowedRoles={["admin", "secretary", "treasurer", "auditor"]}
              />
            }
          >
            <Route element={<DashboardLayout />}>
              <Route path="/events" element={<EventPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/announcements" element={<AnnouncementPage />} />

              <Route path="/expenditure" element={<ExpenditurePage />} />
              <Route path="/fees" element={<FeesPage />} />
              <Route path="/payment-logs" element={<PaymentLogsPage />} />
              <Route path="/fees/memberspaid" element={<MembersPaidPage />} />

              <Route path="/events/attendance" element={<AttendancePage />} />

              <Route path="/officers" element={<OfficersPage />} />

              <Route path="/members" element={<MembersPage />} />

              <Route path="/users" element={<AccountsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
