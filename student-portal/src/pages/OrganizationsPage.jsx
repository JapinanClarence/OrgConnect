import React, { useEffect, useState } from "react";
import OrgCards from "@/components/home/OrgCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import OrgCardSkeleton from "@/components/skeleton/OrgCardSkeleton";
import PageHead from "@/components/nav/PageHead";
import { useNavigate } from "react-router-dom";
const OrganizationsPage = () => {
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
    fetchStudentOrgs();
  }, []);

  const handleClick = async (data) => {
    console.log(data);
    navigate(`/organization/${data}`);
  };
  return (
    <div className="px-5 pt-16 h-full flex flex-col gap-5">
      <PageHead />
      {loading ? (
        <div className="space-y-2 pb-5">
          <OrgCardSkeleton items={6} variant={"horizontal"} />
        </div>
      ) : (
        <div className="space-y-2 pb-5">
          {orgData.map((data) => (
            <OrgCards
              key={data.id}
              id={data.id}
              orgImage={data.banner}
              title={data.name}
              about={data.about}
              variant="horizontal"
              onClick={handleClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;
