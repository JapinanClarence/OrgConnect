import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "@/layouts/DashboardLayout";
import Mainlayout from "@/layouts/Mainlayout";
import Homepage from "@/pages/Homepage";
import Dashboard from "@/pages/Dashboardpage";
import Loginpage from "@/pages/Loginpage";
import Signuppage from "@/pages/Signuppage";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import Eventpage from "@/pages/Eventpage";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/event" element={<Eventpage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
