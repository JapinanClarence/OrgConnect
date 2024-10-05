import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import AddOrganizationDialog from "./AddOrganizationDialog";

const OrganizationInfo = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    const getOrganizationData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userData"));
        const { data } = await apiClient.get("/admin/organization/", {
          headers: {
            Authorization: user.token,
          },
        });

        const { name, description, about, contact } = data.data;
     
        setName(name);
        setDescription(description);
        setAbout(about);
        setContact(contact);
        
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setShowDialog(true);
        }
      }
    };
    getOrganizationData();
  }, []);

  return (
    <>
      <AddOrganizationDialog
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />

      <div className="h-full">
        <div className="flex items-center ">
          <h1 className="text-lg font-semibold md:text-2xl text-gray-900">
            {name}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationInfo;
