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
import {
  dashboardEventColumns,
  dashboardMemberColumns,
} from "@/components/home/Columns";

const Homepage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const [announcementCount, setAnnouncmentCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [paymentCount, setPaymentcount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [eventData, setEventData] = useState("");
  const [memberData, setMemberData] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await apiClient.get("/admin/dashboard/", {
          headers: {
            Authorization: token,
          },
        });
        if (data.success) {
          setEventCount(data.eventCount);
          setAnnouncmentCount(data.announcementCount);
          setPaymentcount(data.paymentCount);
          setMembersCount(data.memberCount);
          setEventData(data.events);
          setMemberData(data.members);
          setChartData(data.eventAttendees);
          setCurrentYear(data.currentYear);
          setCurrentMonth(data.currentMonth);
        }
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setShowDialog(true);
        }
        setLoading(false);
      }
    };
    fetchDashboardData();
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
              value={membersCount}
              color="#8B5CF6"
              loading={loading}
            />
            <Statcard
              name="Total Events"
              icon={ChartCandlestick}
              value={eventCount}
              color="#6366F1"
              loading={loading}
            />
            <Statcard
              name="Total Announcements"
              icon={ChartSpline}
              value={announcementCount}
              color="#EC4899"
              loading={loading}
            />
            <Statcard
              name="Total Payments"
              icon={ChartNoAxesColumn}
              value={paymentCount}
              color="#10B981"
              loading={loading}
            />
          </div>
        </div>
        <div className="flex gap-3 flex-col-reverse md:flex-row ">
          <div className="flex-1 bg-white shadow-sm md:shadow-lg rounded-lg border border-gray-200 text-gray-900 p-5 md:flex flex-col">
            {/* <OrgDetailsCard name={orgData.name} about={orgData.about} contact={orgData.contact}/> */}
            <TableComponent
              title={"Recent Events"}
              columns={dashboardEventColumns}
              data={eventData}
              loading={loading}
              rowCount={5}
              cellCount={3}
            />
          </div>
          <div className="w-1/3  bg-white shadow-sm md:shadow-lg rounded-lg border border-gray-200 text-gray-900">
            <AttendeesChart
              data={chartData}
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </div>
        </div>
        <div className=" bg-white md:shadow-lg rounded-lg border border-gray-200 text-gray-900 p-5 md:flex flex-col">
          <TableComponent
            title={"New Members"}
            columns={dashboardMemberColumns}
            data={memberData}
            loading={loading}
            rowCount={5}
            cellCount={7}
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
