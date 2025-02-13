import React, { useState, useEffect, useMemo } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "../Dashboard/OverviewTab";
import ReportTab from "../Dashboard/ReportTab";

const AdminHomeContent = () => {
  
  return (
    <>
      <Tabs defaultValue="overview" className="">
        <TabsList className="grid w-fit grid-cols-2 border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab/>
        </TabsContent>

        <TabsContent value="reports">
          <ReportTab />
        </TabsContent>
        <TabsContent value="reports"></TabsContent>
      </Tabs>
    </>
  );
};

export default AdminHomeContent;
