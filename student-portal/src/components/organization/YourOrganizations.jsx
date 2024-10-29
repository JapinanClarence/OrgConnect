import React, { useEffect, useState } from "react";
import OrgCards from "@/components/organization/OrgCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import OrgCardSkeleton from "@/components/skeleton/OrgCardSkeleton";
import { useNavigate } from "react-router-dom";

const YourOrganizations = () => {
  const { token, userData } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudentOrgs = async () => {
    try {
      const { data } = await apiClient.get("/user/organization/?my_orgs=true", {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        setOrgData(data.data);
      } else {
        setOrgData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentOrgs();
  }, []);

  const handleClick = async (data) => {
    navigate(`/organization/${data}`);
  };
  return (
    <>
      {loading ? (
        <div className="space-y-2 pb-5">
          <OrgCardSkeleton items={6} variant={"horizontal"} />
        </div>
      ) : orgData <= 0 ? (
        <div className="w-full h-[200px]  flex items-center justify-center text-muted-foreground">
          No organizations found.
        </div>
      ) : (
        <div className="flex flex-col gap-2 pb-5 ">
          {orgData.map((data) => (
            <OrgCards
                variant={"horizontal"}
              key={data.id}
              id={data.id}
              orgImage={data.banner}
              title={data.name}
              about={data.about}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default YourOrganizations;
