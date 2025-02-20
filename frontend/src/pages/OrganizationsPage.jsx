import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly } from "@/util/helpers";
import OrgTable from "@/components/superadmin/OrgTable";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import AddAcadsDialog from "@/components/superadmin/AddAcadsDialog";
import { CreateOrgSchema, EditOrgSchema } from "@/schema";
import EditOrgDialog from "@/components/superadmin/EditOrgDialog";
import AddOrgDialog from "@/components/superadmin/AddOrgDialog";
import { useNavigate } from "react-router-dom";

const OrganizationsPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentOrgData, setCurrentOrgData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const date = formatDate(Date.now());
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(CreateOrgSchema),
    defaultValues: {
      name: "",
      admin: "",
    },
  });

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
            remarks: data.remarks,
            admin: data.admin,  
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

  const handleEditDialog = (data) => {
    setShowEditDialog(true);

    setCurrentOrgData(data);
  };

  const handleClick = (data) =>{
    navigate(`/organization/${data.id}`);
  }
  const onAdd = async (data) =>{
   
    try {
      setIsSubmitting(true);
      const res = await apiClient.post("/superadmin/organization", data, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        await fetchOrganizations();
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();

        toast({
          title: "Organization has been added",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  }
  const onEdit = async (data) => {
    try {
      const formData = {
        active: data.status,
        remarks: data.remarks || null,
      };
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/superadmin/organization/${currentOrgData.id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchOrganizations();
        setIsSubmitting(false);
        setShowEditDialog(false);
        form.reset();

        toast({
          title: `Organization has been updated`,
          description: `${date}`,
        });
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  return (
    <>
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 w-full flex flex-col relative">
        <Label className="font-semibold">Organizations</Label>
        <OrgTable
          data={orgData}
          onEdit={handleEditDialog}
          onClick={handleClick}
          onAdd={setShowAddDialog}
        />
      </div>
      {/* </div> */}

      <AddOrgDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        form={form}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
      <EditOrgDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        orgData={currentOrgData}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onSubmit={onEdit}
      />
    </>
  );
};

export default OrganizationsPage;
