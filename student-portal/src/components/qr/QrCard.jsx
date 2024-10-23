import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { Loader, LoaderCircle } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const QrCard = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const { data } = await apiClient.get("/user", {
        headers: {
          Authorization: token,
        },
      });
      if (!data) {
        return console.log(data);
      }
      setUserData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-slate-100 w-full border border-zinc-300 shadow-md  rounded-lg p-5 text-gray-900 bg-grid-small-white/[0.2]">
      {loading ? (
        <div className="flex justify-center">
          <div className=" space-y-5">
            <Skeleton className={"w-32 h-7 mx-auto bg-zinc-300 rounded-lg"} />
            <Skeleton className={"w-52 h-7 bg-zinc-300 rounded-lg "} />

            <Skeleton className={"w-24 h-7 mx-auto bg-zinc-300 rounded-lg"} />
            <Skeleton className={"w-48 h-7 mx-auto bg-zinc-300 rounded-lg "} />
          </div>
        </div>
      ) : (
        <>
          <div className="font-semibold flex-1 text-center mb-5 mt-10">
            <h1 className="text-2xl">Student QR Code</h1>
            <p className="text-sm font-normal text-muted-foreground">
              Present this when attending events.
            </p>
          </div>
          <div className=" text-center my-auto">
            <h1 className="text-2xl font-semibold">
              {userData.firstname} {userData.lastname}
            </h1>
            <h1 className="text-sm font-medium">{userData.studentId}</h1>
          </div>
        </>
      )}

      <div className="p-16">
        {loading ? (
          <Skeleton className="h-[200px]  bg-zinc-300 " />
        ) : (
          <div className="p-2 border shadow-sm bg-white rounded-md">
            <QRCode
              className=""
              size={150}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
                margin: "0px auto",
              }}
              value={userData.studentId}
              viewBox={`0 0 256 256`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCard;
