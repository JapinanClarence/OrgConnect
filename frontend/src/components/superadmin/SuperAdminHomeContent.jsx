import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly } from "@/util/helpers";
import DashboardTable from "./DashboardTable";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatDate } from "@/util/helpers";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import AddAcadsDialog from "@/components/superadmin/AddAcadsDialog";
import { CreateOrgSchema, EditOrgSchema } from "@/schema";
import EditOrgDialog from "@/components/superadmin/EditOrgDialog";
import AddOrgDialog from "./AddOrgDialog";
import StatCard from "./StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import OrgChart from "./OrgChart";
import { Calendar } from "@/components/ui/calendar";
import { User2 } from "lucide-react";

const semesterMap = {
  0: "1st Semester",
  1: "2nd Semester",
  3: "Summer",
};

const SuperAdminHomeContent = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [currentSemester, setCurrentSemester] = useState("");
  const date = formatDate(Date.now());
  const { toast } = useToast();
  const [currentDate, setDate] = useState(new Date());
  const [adminData, setAdminData ] = useState("");
  const form = useForm({
    resolver: zodResolver(CreateOrgSchema),
    defaultValues: {
      name: "",
      admin: "",
    },
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await apiClient.get("/superadmin/dashboard", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setCurrentSemester("");
        setAdminData("");
        setOrgData([]);
      } else {
        setCurrentSemester(data.currentSemester);
        const tableData = data.orgData.map((data) => {
          return {
            id: data._id,
            name: data.name,
            createdAt: data.createdAt ? dateOnly(data.createdAt) : null,
            status: data.active,
            banner: data.banner,
            remarks: data.remarks,
            admin: data.admin,
            type: data.type,
          };
        });
        setAdminData(data.adminCount);
        setOrgData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-2">
        <div className=" bg-white shadow-sm md:shadow-lg rounded-lg  border border-gray-200 text-gray-900 p-5">
          {loading ? (
            <Skeleton className={"h-10"} />
          ) : (
            <>
              <h1 className="text-2xl font-semibold border-b pb-1 mb-2">
                Dashboard
              </h1>
              <p className="font-medium text-sm">
                Current Academic Year:{" "}
                {currentSemester && currentSemester.academicYear} -{" "}
                {semesterMap[currentSemester.semester]}
              </p>
            </>
          )}
        </div>
        <div className="flex gap-3 flex-col-reverse lg:flex-row ">
          <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
            <Label className="font-semibold text-xl">Organizations</Label>
            <DashboardTable data={orgData}  />
          </div>
          <div className="flex-1 flex gap-2 flex-col">
            <div className=" text-gray-900 flex-1 max-h-min ">
              <StatCard
                name={"Total Admin Accounts"}
                icon={User2}
                value={adminData}
                color={"#8B5CF6"}
                loading={loading}
              />
            </div>
            <div className=" text-gray-900 flex-1 h-full">
              <OrgChart data={orgData} />
            </div>
            <div className="bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200">
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminHomeContent;
