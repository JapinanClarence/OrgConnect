import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-gray-700"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
