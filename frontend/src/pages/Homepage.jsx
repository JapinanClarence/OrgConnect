import { motion } from "framer-motion";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/axios";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await apiClient.get("/admin/profile", {
          headers: {
            Authorization: token,
          },
        });
        const userData = response.data;

        localStorage.setItem("userData", JSON.stringify(userData.data));
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    getUser();
  });
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Homepage" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8"></main>
    </div>
  );
};

export default Homepage;
