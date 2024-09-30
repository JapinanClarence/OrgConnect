import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Mainlayout from "./layouts/Mainlayout";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboardpage";

const App = () => {
  return (
    <div className="h-screen text-gray-100 w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] flex">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Routes>
        <Route path="/" element={<Mainlayout/>}>
          <Route path="/login"></Route>
        </Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
