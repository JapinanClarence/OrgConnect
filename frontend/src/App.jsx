import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboardpage";
const App = () => {
  return (
    <div className="h-screen text-gray-100 w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] flex">
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    {/* <div className="flex h-screen text-gray-100 overflow-hidden"> */}
      {/* <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>
          </div> */}

      <Sidebar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  
  );
};

export default App;
