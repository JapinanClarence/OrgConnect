import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { Label } from "@/components/ui/label";
import { formatDate, dateOnly } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddAdmin from "@/components/superadmin/AddAdmin";
// import { Card, CardContent, CardHeader } from "../ui/card";
import { RegistrationSchema } from "@/schema";

const AdminAccPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentOrgData, setCurrentOrgData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const date = formatDate(Date.now());
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    }, // Set default values at initialization
  });

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

          return {
            id: data._id,
            username: data.username,
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

  const onAdd = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = {
        email: data.email,
        username: data.username,
        password: data.password,
      };

      const res = await apiClient.post(`/superadmin/accounts/`, formData, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();
        toast({
          title: "User registered.",
          description: `${date}`,
        });
        fetchAdminAccounts();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
    }
  }

  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
      <h1 className="font-bold">Accounts</h1>
      <p className="text-sm text-muted-foreground">
        View and manage admin accounts here.
      </p>
      <AdminTable
        data={userData}
        onUpdateStatus={updateUser}
        onAdd={setShowAddDialog}
      />
      <AddAdmin
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        form={form}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default AdminAccPage;
