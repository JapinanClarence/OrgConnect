import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {

  return (
    <Routes>
      <Route path='/'>
        <Route path="/login" element={ <LoginPage/>}/>
       <Route path="/signup" element={ <SignupPage/>}/>
      </Route>
       
    </Routes>
  )
}

export default App
