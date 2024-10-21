import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import DashboardLayout from "./layouts/DashboardLayout";
import Mainlayout from "./layouts/Mainlayout";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import Eventpage from "./pages/Eventpage";
import AnnouncementPage from "./pages/AnnouncementPage";
import PaymentPage from "./pages/PaymentPage";
import AttendancePage from "./pages/AttendancePage";
import MembersPage from "./pages/MembersPage";
import SettingsPage from "./pages/SettingsPage";
import OfficersPage from "./pages/OfficersPage";

const App = () => {
  return (
    <>
      <Toaster />
      {/* <Test/> */}
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route path="/login" element={<Loginpage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/events" element={<Eventpage />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/payments" element={<PaymentPage />} />
            <Route path="/events/attendance" element={<AttendancePage />} />
            <Route path="/officers" element={<OfficersPage />} />
            <Route path="/members" element={<MembersPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
