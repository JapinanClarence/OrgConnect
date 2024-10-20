import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import AccountForm from "@/components/settings/AccountForm";
import OrganizationForm from "@/components/settings/OrganizationForm";
import { AdminSchema, OrgSchema } from "@/schema";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

const SettingsPage = () => {
  const [orgData, setOrgData] = useState({});
  const { token, userData } = useAuth();

  const getOrganizationData = async () => {
    try {
      const { data } = await apiClient.get("/admin/organization/", {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        setOrgData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizationData();
  }, []);

  return (
    <div className="p-5 md:p-0 flex justify-center items-center">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-gray-200 grid w-full md:w-min grid-cols-[1fr,1fr]">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountForm />
        </TabsContent>
        <TabsContent value="organization">
          {orgData && <OrganizationForm orgData={orgData} updateData={() => getOrganizationData()}/>}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
