import React, { useEffect, useState } from "react";
import OrgCards from "@/components/home/OrgCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import OrgCardSkeleton from "@/components/skeleton/OrgCardSkeleton";
import PageHead from "@/components/nav/PageHead";

const OrganizationsPage = () => {
  const { token, userData } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const loading = true;
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
  return (
    <div className="py-16">
      <PageHead />

      <div className="px-5 mt-5">
        {loading ? (
          <div className="space-y-2 ">
            <OrgCardSkeleton items={20} variant={"horizontal"}/>
          </div>
        ) : (
          <div className="">
            {orgData.map((data) => (
              <OrgCards
                key={data.id}
                orgImage={data.banner}
                title={data.name}
                about={data.about}
                variant="horizontal"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationsPage;
