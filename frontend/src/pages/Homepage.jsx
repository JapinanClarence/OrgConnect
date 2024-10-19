import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import AddOrganizationDialog from "@/components/home/AddOrganizationDialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Homepage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    const getOrganizationData = async () => {
      try {
        const  token = localStorage.getItem("token");
        const { data } = await apiClient.get("/admin/organization/", {
          headers: {
            Authorization: token,
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
     
      <div className="h-full flex justify-center items-center">
        {/* <Card className="text-gray-900 mx-auto">
          <CardHeader>
            <div className="flex items-center  border-b-[1px] border-gray-400 shadow-sm">
              <h1 className="text-lg font-semibold md:text-2xl  py-2">
                {name}
              </h1>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="">
              <div className="">
                <p>{description}</p>
              </div>
            </div>
            <div className="">
              <div className="">
                <h1 className=" font-bold text-xl mb-2">About</h1>
                <p>{about}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="">
              <div className="">
                <h1 className="font-bold text-xl mb-2">Contact Us</h1>
                <p>{contact}</p>
              </div>
            </div>
          </CardFooter>
        </Card> */}
      </div>
    </>
  );
};

export default Homepage;
