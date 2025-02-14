import React, { useState, useEffect, useMemo } from "react";
import apiClient from "@/api/axios";
import Statcard from "@/components/home/Statcard";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartCandlestick,
  ChartNoAxesColumn,
  ChartSpline,
  Users,
  TrendingUp,
} from "lucide-react";
import MembersChart from "../home/MembersChart";
import AnnouncementsChart from "../home/AnnouncementsChart";
import AttendeesChart from "@/components/home/AttendeesChart";
import TableComponent from "@/components/home/Table";
import {
    dashboardEventColumns,
    dashboardMemberColumns,
  } from "@/components/home/Columns";
  import { Skeleton } from "@/components/ui/skeleton";

const OverviewTab = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const [announcementCount, setAnnouncmentCount] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [totalCollectedFees, setTotalFees] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [announcementData, setAnnouncementData] = useState([]);
  const [organizationName, setOrganizationName] = useState("");

  const { userData } = useAuth();

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
          setOrganizationName(data.organization);
          setEventCount(data.eventCount);
          setAnnouncmentCount(data.announcementCount);
          setTotalFees(data.totalCollectedFees);
          setMembersCount(data.memberCount);
          setEventData(data.events);
          setMemberData(data.members);
          setChartData(data.eventAttendees);
          setCurrentYear(data.currentYear);
          setCurrentMonth(data.currentMonth);
          setAnnouncementData(data.announcements);
          setTotalExpenses(data.totalExpenses)
        }
        setLoading(false);
      } catch (error) {
        // if (error.response && error.response.status === 404) {
        //   setShowDialog(true);
        // }
        console.log(error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className=" bg-white shadow-sm md:shadow-lg rounded-lg  border border-gray-200 text-gray-900 p-5">
        {loading ? (
          <Skeleton className={"h-10"} />
        ) : (
          <h1 className="text-2xl font-semibold border-b pb-1 ">
            {organizationName}
          </h1>
        )}

        <div className="max-h-full w-full grid grid-flow-row lg:grid-flow-col grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-5 mt-5">
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
            name="Total Collection"
            icon={ChartNoAxesColumn}
            value={totalCollectedFees}
            color="#10B981"
            loading={loading}
          />
           <Statcard
            name="Total Expenses"
            icon={ChartNoAxesColumn}
            value={totalExpenses}
            color="#10B981"
            loading={loading}
          />
        </div>
      </div>
      <div className=" flex gap-3 flex-col-reverse md:flex-row">
        <div className="flex-1   text-gray-900  md:flex flex-col">
          <MembersChart data={memberData} />
        </div>
        <div className="flex-1   text-gray-900  md:flex flex-col">
          <AnnouncementsChart data={announcementData} />
        </div>
      </div>
      <div className="flex gap-3 flex-col-reverse md:flex-row ">
        <div className="flex-1 bg-white shadow-sm md:shadow-lg rounded-lg border border-gray-200 text-gray-900 p-5 md:flex flex-col">
          {/* <OrgDetailsCard name={orgData.name} about={orgData.about} contact={orgData.contact}/> */}
          <TableComponent
            title={"Recent Events"}
            searchContent={"Search Events"}
            columns={dashboardEventColumns}
            data={eventData}
            loading={loading}
            rowCount={5}
            cellCount={3}
          />
        </div>
        <div className="md:w-1/3  bg-white shadow-sm md:shadow-lg rounded-lg border border-gray-200 text-gray-900">
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
          searchContent={"Search Members"}
          columns={dashboardMemberColumns}
          data={memberData}
          loading={loading}
          rowCount={5}
          cellCount={7}
        />
      </div>
    </div>
  );
};

export default OverviewTab;
