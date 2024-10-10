import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import DashboardLayout from "@/layouts/DashboardLayout";
import Mainlayout from "@/layouts/Mainlayout";
import Homepage from "@/pages/Homepage";
import Dashboard from "@/pages/Dashboardpage";
import Loginpage from "@/pages/Loginpage";
import Signuppage from "@/pages/Signuppage";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import Eventpage from "@/pages/Eventpage";
import AnnouncementPage from "@/pages/AnnouncementPage";

// for testing only
import { Test } from "@/pages/Test";
const App = () => {
  return (
    <>
      <Toaster />
      {/* <Test/> */}
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/event" element={<Eventpage />} />
            <Route path="/announcement" element={<AnnouncementPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
