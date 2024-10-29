import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<DashboardLayout />}>
              {/* <Route index element={<Homepage />} /> */}
              {/* <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/events" element={<Eventpage />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/payments" element={<PaymentPage />} />
            <Route path="/events/attendance" element={<AttendancePage />} />
            <Route path="/officers" element={<OfficersPage />} />
            <Route path="/members" element={<MembersPage />} /> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
