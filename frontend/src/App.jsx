import { useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from './pages/Loginpage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
