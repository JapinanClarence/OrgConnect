import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/axios";

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
    <>
      <div className="flex items-center ">
        <h1 className="text-lg font-semibold md:text-2xl text-gray-900">
          Inventory
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg  text-gray-900 border border-gray-900 border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
