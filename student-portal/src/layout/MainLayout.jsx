
import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
