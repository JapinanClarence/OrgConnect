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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
         <Toaster />
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<HomePage />} />
              {/* <Route path="/settings" element={<SettingsPage/>}/> */}
            {/* <Route path="/events" element={<Eventpage />} /> */}
            <Route path="/announcements" element={<AnnouncementPage />} />
            {/* <Route path="/payments" element={<PaymentPage />} /> */}
            {/* <Route path="/events/attendance" element={<AttendancePage />} /> */}
            {/* <Route path="/officers" element={<OfficersPage />} /> */}
            <Route path="/members" element={<MembersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
