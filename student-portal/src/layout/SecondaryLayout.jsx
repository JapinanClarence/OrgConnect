import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import PageHead from "@/components/nav/PageHead";
import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="h-screen bg-slate-50">
      <PageHead/>
      <Outlet />
    </div>
  );
};

export default MainLayout;
