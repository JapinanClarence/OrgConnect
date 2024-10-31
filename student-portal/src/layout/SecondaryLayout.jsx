import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import PageHead from "@/components/nav/PageHead";
import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="h-screen bg-slate-50 relative">
      <div className="hidden absolute h-screen bg-slate-50 left-0 right-0 z-50 lg:flex justify-center items-center">
        <h1 className="text-muted-foreground">
          Application is only available on mobile.
        </h1>
      </div>
      {/* <PageHead/> */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
