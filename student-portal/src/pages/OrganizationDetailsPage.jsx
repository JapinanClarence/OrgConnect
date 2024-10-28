import React, { useEffect, useState } from "react";
import sample from "@/assets/sample.jpg";
import { ChevronLeft, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OrganizationDrawer from "@/components/organization/OrganizationDrawer";
import { useLocation, useParams } from "react-router-dom";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import AboutCard from "@/components/organization/AboutCard";
import AboutSkeleton from "@/components/skeleton/AboutSkeleton";
import OrgHeader from "@/components/organization/OrgHeader";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import LeaveDialog from "@/components/organization/LeaveDialog";

const OrganizationDetailsPage = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const [orgData, setOrgData] = useState("");
  const { token } = useAuth();
  const { toast } = useToast();
  const date = formatDate(Date.now());
  const [showAlert, setShowAlert] = useState(false);
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
      if (!data.success) {
        setOrgData([]);
      } else {
        setOrgData(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLeave = () => {
    setShowAlert(true);
    setOpenDrawer(false);
  };

  const onLeave = async () => {
    try {
      setIsSubmitting(true);
      const { data } = await apiClient.delete(`/user/organization/${orgData._id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (data.success) {
        toast({
          title: "You have left the organization",
          description: `${date}`,
        });
        navigate(-1);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="">
      <header className="fixed top-0 left-0 w-full z-10 ">
        <div className="px-3 py-2 bg-slate-50 shadow-sm border-b  flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className=""
            onClick={handleClick}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="ghost"
            size="icon"
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
        {loading ? (
          <Skeleton className={"h-full w-full "} />
        ) : (
          <OrgHeader orgData={orgData} />
        )}
      </div>

      <div className="px-5 py-5 space-y-2">
        {loading ? <AboutSkeleton /> : <AboutCard orgData={orgData} />}
      </div>

      <OrganizationDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        onLeave={handleLeave}
        id={orgData._id}
      />
      <LeaveDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        onConfirm={onLeave}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default OrganizationDetailsPage;
