import React, { useState, useEffect, useMemo } from "react";
import apiClient from "@/api/axios";
import AdminHomeContent from "@/components/home/AdminHomeContent";
import { useAuth } from "@/context/AuthContext";
const HomePage = () => {
  const {userData} = useAuth();

  return (
    <>
    {userData.role == "1" ? ( <AdminHomeContent/>) : (<div></div>)}
     
    </>
  );
};

export default HomePage;
