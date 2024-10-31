import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";

const SuperAdminHomeContent = () => {
  const [data, setData] = useState([]);
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
        setData([]);
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
        setData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <AdminTable data={data} />
    </div>
  );
};

export default SuperAdminHomeContent;
