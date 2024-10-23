import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";

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
    <div className="bg-zinc-200 w-full border border-zinc-300 shadow-md  rounded-lg p-5 text-gray-900 bg-grid-small-white/[0.2]">
      {/* <div>
        <img className="size-10" src="OrgConnect - transparent.svg" alt="" />
      </div> */}
      <div className="font-semibold flex-1 text-center mb-5 mt-10">
        <h1 className="text-2xl">
            Student QR Code
        </h1>
        <p className="text-sm font-normal text-muted-foreground">Present this when attending events.</p>
      </div>
      <div className=" text-center my-auto">
        <h1 className="text-2xl font-semibold">
          {userData.firstname} {userData.lastname}
        </h1>
        <h1 className="text-sm font-medium">{userData.studentId}</h1>
      </div>
      <div className="p-12  ">
        <div className="p-2 bg-white rounded-md">
          {loading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default QrCard;
