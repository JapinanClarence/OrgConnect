import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Mainlayout from "./layouts/Mainlayout";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboardpage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signuppage/>}/>
      </Route>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
