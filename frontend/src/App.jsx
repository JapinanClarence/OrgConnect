import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Mainlayout from "./layouts/Mainlayout";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Mainlayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
