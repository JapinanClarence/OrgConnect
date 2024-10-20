import React, { useState, useEffect, useMemo } from "react";
import apiClient from "@/api/axios";
import AddOrganizationDialog from "@/components/home/AddOrganizationDialog";
import Statcard from "@/components/home/Statcard";
import { Button } from "@/components/ui/button";
import {
  ChartCandlestick,
  ChartNoAxesColumn,
  ChartSpline,
  Users,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AttendeesChart from "@/components/home/AttendeesChart";
import TableComponent from "@/components/home/Table";
import { dashboardEventColumns, dashboardMemberColumns } from "@/components/home/Columns";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};
const eventData = [];
const memberData =[];
const Homepage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [orgData, setOrgData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrganizationData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await apiClient.get("/admin/organization/", {
          headers: {
            Authorization: token,
          },
        });
        if (data.success) {
          setOrgData(data.data);
        }
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setShowDialog(true);
        }
        setLoading(false);
      }
    };
    getOrganizationData();
  }, []);

  return (
    <>
      <AddOrganizationDialog
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />
      <div className="flex flex-col gap-3 p-2">
        <div className=" bg-white shadow-sm md:shadow-lg rounded-lg  border border-gray-200 text-gray-900 p-5">
          {loading ? (
            <Skeleton className={"h-10"} />
          ) : (
            <h1 className="text-2xl font-semibold border-b pb-1 ">Dashboard</h1>
          )}

          <div className="max-h-full w-full grid grid-flow-row lg:grid-flow-col grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-5">
            <Statcard
              name="Total Members"
              icon={Users}
              value="1,234"
              color="#8B5CF6"
              loading={loading}
            />
            <Statcard
              name="Total Events"
              icon={ChartCandlestick}
              value="$12,345"
              color="#6366F1"
              loading={loading}
            />
            <Statcard
              name="Total Announcements"
              icon={ChartSpline}
              value="567"
              color="#EC4899"
              loading={loading}
            />
            <Statcard
              name="Total Payments"
              icon={ChartNoAxesColumn}
              value="12.5%"
              color="#10B981"
              loading={loading}
            />
          </div>
        </div>
        <div className="flex gap-3 flex-col-reverse md:flex-row ">
          <div className="flex-1 bg-white shadow-sm md:shadow-lg rounded-lg border border-gray-200 text-gray-900 p-5 md:flex flex-col">
            {/* <OrgDetailsCard name={orgData.name} about={orgData.about} contact={orgData.contact}/> */}
            <TableComponent title={"Recent Events"} columns={dashboardEventColumns} data={eventData} loading={true} rowCount = {5} cellCount={3}/>
          </div>
          <div className="flex-none  bg-white shadow-sm md:shadow-lg rounded-lg border border-gray-200 text-gray-900">
            <AttendeesChart chartData={chartData} chartConfig={chartConfig} />
          </div>
        </div>
        <div className=" bg-white md:shadow-lg rounded-lg border border-gray-200 text-gray-900 p-5 md:flex flex-col">
          <TableComponent title={"New Members"} columns={dashboardMemberColumns} data={memberData} loading={true} rowCount = {5} cellCount={7}/>
        </div>
      </div>
    </>
  );
};

export default Homepage;
