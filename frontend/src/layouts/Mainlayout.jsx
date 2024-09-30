"use client";
import { Outlet } from "react-router-dom";
import React from "react";

const Mainlayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Mainlayout;
