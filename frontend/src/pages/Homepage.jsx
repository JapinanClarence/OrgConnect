import { useEffect, useState } from "react";

import apiClient from "@/api/axios";
import OrganizationInfo from "@/components/Home/OrganizationInfo";

const Homepage = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userData"));
        const response = await apiClient.get("/admin/profile", {
          headers: {
            Authorization: user.token,
          },
        });

        const updatedUserData = {
          ...user, // Keep existing token
          userData: response.data.data, // Update user info with the new gathered data
        };

        // Update the localStorage with the new user info
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    };
    getUserData();
  });
  return (
    <div className="h-full p-10">
      <OrganizationInfo />
    </div>
  );
};

export default Homepage;
