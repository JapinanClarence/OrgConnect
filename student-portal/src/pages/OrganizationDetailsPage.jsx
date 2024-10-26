import React, { useEffect, useState } from "react";
import sample from "@/assets/sample.jpg";
import { ChevronLeft, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OrganizationDrawer from "@/components/organization/OrganizationDrawer";
import { useLocation, useParams } from "react-router-dom";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
const OrganizationDetailsPage = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [orgData, setOrgData] = useState("");
  const { token } = useAuth();
  const handleClick = () => {
    navigate(-1);
  };

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(`/user/organization/${params.id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (data) {
        setOrgData(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <header className="fixed top-0 left-0 w-full h-10 z-10 ">
        <div className="px-3 py-2 bg-slate-50 shadow-sm border-b  flex items-center justify-between">
          <button className="" onClick={handleClick}>
            <ChevronLeft size={25} />
          </button>

          <Button
            variant="icon"
            className="h-5 item-center border-zinc-300 text-md flex-shrink"
            onClick={() => setOpenDrawer(true)}
          >
            <Ellipsis />
          </Button>
        </div>
      </header>
      <div
        className="relative mt-10 h-[180px] overflow-hidden bg-cover bg-center border-b-yellow-500 border-b-4"
        style={{ backgroundImage: `url(${orgData.banner})` }}
      >
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 absolute h-full w-full opacity-80"></div>
        <div className=" absolute top-0 h-full w-full flex justify-center items-center ">
          <h1 className="font-medium text-2xl text-white font-accent">
            {orgData.name}
          </h1>
        </div>
      </div>
      <OrganizationDrawer open={openDrawer} onOpenChange={setOpenDrawer} id={orgData._id}/>

      <div className="px-5 py-5 space-y-2">
        <div className="rounded-lg px-5 py-4 shadow-sm border space-y-2">
          <h2 className="text-lg font-medium">About</h2>
          <p className="text-pretty text-sm">{orgData.about}</p>
        </div>
        <div className="rounded-lg px-5 py-4 shadow-sm border space-y-2">
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="text-pretty text-sm">{orgData.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;
