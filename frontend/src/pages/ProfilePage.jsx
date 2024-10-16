import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/axios";
import { Camera } from "lucide-react";
const ProfilePage = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState("");
  const fetchProfile = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const { data } = await apiClient.get("/admin/profile", {
        headers: {
          Authorization: user.token,
        },
      });

      if (data.success) {
        setData(data.data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  });

  return (
    <>
      <Card className={"shadow-none border-none"}>
        <CardContent>
          <CardHeader className="border-b border-zinc-300 px-0">
            <CardTitle className={"p-0"}>User Information</CardTitle>
          </CardHeader>
          <div className="flex py-5 items-center">
            <div className="size-20 bg-gray-200 rounded-full flex items-center">
              {!data.profilePicture ? (
                <Camera size={30} className="m-auto text-gray-300" />
              ) : null}
            </div>
            <div></div>
          </div>
          <div>
            <div className=" grid grid-cols-[90px_1fr] ">
              <div className="text-muted-foreground space-y-1">
                <div>Firstname:</div>
              </div>
              <div className="font-semibold space-y-1">
                <div>{data.firstname}</div>
              </div>
            </div>
            <div className=" grid grid-cols-[90px_1fr] ">
              <div className="text-muted-foreground space-y-1">
                <div>Lastname;</div>
              </div>
              <div className="font-semibold space-y-1">
                <div>{data.lastname}</div>
              </div>
            </div>
            <div className=" grid grid-cols-[90px_1fr] ">
              <div className="text-muted-foreground space-y-1">
                <div>Middlename:</div>
              </div>
              <div className="font-semibold space-y-1">
                <div>{data.middlename}</div>
              </div>
            </div>
            <div className=" grid grid-cols-[90px_1fr] ">
              <div className="text-muted-foreground space-y-1">
                <div>Username:</div>
              </div>
              <div className="font-semibold space-y-1">
                <div>{data.username}</div>
              </div>
            </div>
            <div className=" grid grid-cols-[90px_1fr] ">
              <div className="text-muted-foreground space-y-1">
                <div>Email:</div>
              </div>
              <div className="font-semibold space-y-1">
                <div>{data.email}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfilePage;
