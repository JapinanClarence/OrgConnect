import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import PageHead from "@/components/nav/PageHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YourOrganizations from "@/components/organization/YourOrganizations";
import DiscoverOrganizations from "@/components/organization/DiscoverOrganizations";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const OrganizationsPage = () => {
  const navigate = useNavigate();
  const {token} = useAuth();
    
  const onSubmit = async (content) => {
 
    try {
      const { data } = await apiClient.get(`/user/search?query=${content}`, {
        headers: {
          Authorization: token,
        },
      });


      if(data.success){
        navigate("/search", { state: { results: data.data } }); // Redirect with state
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-16 h-full gap-5">
      <PageHead
        title={"Organizations"}
        allowSearch={true}
        onSubmit={onSubmit}
      />

      <Tabs defaultValue="orgs" className="px-5">
        <TabsList className="grid grid-cols-2  bg-zinc-200 mb-3">
          <TabsTrigger value="orgs">Your organizations</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="orgs">
          <YourOrganizations />
        </TabsContent>
        <TabsContent value="discover">
          <DiscoverOrganizations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationsPage;
