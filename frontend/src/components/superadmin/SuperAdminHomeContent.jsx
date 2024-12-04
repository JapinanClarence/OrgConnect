import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly } from "@/util/helpers";
import OrgTable from "./OrgTable";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
const SuperAdminHomeContent = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    fetchAdminAccounts();
    fetchOrganizations();
  }, []);

  const fetchAdminAccounts = async () => {
    try {
      const { data } = await apiClient.get("/superadmin/accounts", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setUserData([]);
      } else {
        const tableData = data.data.map((data) => {
          const fullname = `${data.firstname} ${
            data.middlename ? data.middlename[0] + ". " : ""
          }${data.lastname}`;
          return {
            id: data._id,
            username: data.username,
            fullname: fullname,
            email: data.email,
            status: data.active,
            profilePicture: data.profilePicture,
          };
        });

        setUserData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
  const updateUser = async (reqData) => {
    const userId = reqData.id;

    try {
      const { data } = await apiClient.patch(
        `/superadmin/accounts/${userId}`,
        {
          active: reqData.active,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        fetchAdminAccounts();
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateOrg = async (reqData) => {};
  return (
    <>
      <div className="mb-2">
        <Label>Current Semister: 1st A.Y. 2024-2025</Label>
        <Card>
          <CardContent>
            <CardHeader>
              Hello
            </CardHeader>
          </CardContent>
        </Card>
      </div>
      {/* <div className="flex gap-2"> */}
        {/* <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
          <Label className="font-semibold">Users</Label>
          <AdminTable data={userData} onUpdateStatus={updateUser} />
        </div> */}
        <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
          <Label className="font-semibold">Organizations</Label>
          <OrgTable data={orgData} onUpdateStatus={updateOrg} />
        </div>
      {/* </div> */}
    </>
  );
};

export default SuperAdminHomeContent;
