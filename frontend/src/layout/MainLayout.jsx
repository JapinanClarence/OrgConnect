"use client";
import { Outlet } from "react-router-dom";
import React from "react";

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
