import React, { useEffect, useState } from "react";

import PageHead from "@/components/nav/PageHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YourOrganizations from "@/components/organization/YourOrganizations";
import DiscoverOrganizations from "@/components/organization/DiscoverOrganizations";

const OrganizationsPage = () => {
  return (
    <div className="pt-16 h-full gap-5">
      <PageHead title={"Organizations"} />

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
