import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly } from "@/util/helpers";
import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader } from "../ui/card";

const AdminAccPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchAdminAccounts();
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

  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
         <h1 className="font-bold">Accounts</h1>
      <p className="text-sm text-muted-foreground">
        View and manage admin accoutns here.
      </p>
      <AdminTable data={userData} onUpdateStatus={updateUser} />
    </div>
  );
};

export default AdminAccPage;
