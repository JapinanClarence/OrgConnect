import React, { useState, useEffect, useMemo } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "../dashboard/OverviewTab";
import ReportTab from "../dashboard/ReportTab";

const AdminHomeContent = () => {
  
  return (
    <>
    <OverviewTab/>
      {/* <Tabs defaultValue="overview" className="p-5 md:px-0">
        <TabsList className="grid w-fit grid-cols-2 border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab/>
        </TabsContent>

        <TabsContent value="reports">
          <ReportTab />
        </TabsContent>
        <TabsContent value="reports"></TabsContent>
      </Tabs> */}
    </>
  );
};

export default AdminHomeContent;
