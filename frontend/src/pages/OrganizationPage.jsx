import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly } from "@/util/helpers";
import OrgTable from "@/components/superadmin/OrgTable";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const OrganizationPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const { data } = await apiClient.get("/superadmin/organization", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => {
          return {
            id: data._id,
            name: data.name,
            createdAt: data.createdAt ? dateOnly(data.createdAt) : null,
            status: data.active,
            banner: data.banner,
          };
        });

        setOrgData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const updateOrg = async (reqData) => {};
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
      <h1 className="font-bold">Organization</h1>
      <p className="text-sm text-muted-foreground">
        View and manage organization here.
      </p>
      <OrgTable data={orgData} onUpdateStatus={updateOrg} />
    </div>
  );
};

export default OrganizationPage;
