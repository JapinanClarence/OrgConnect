import React, { useState, useEffect } from "react";
import AdminTable from "@/components/superadmin/AdminTable";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly } from "@/util/helpers";
import DashboardTable from "./DashboardTable";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { Activity, Building, User2 } from "lucide-react";

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
  const [adminData, setAdminData] = useState("");
  const [activeOrgs, setActiveOrgs] = useState("");
  const [inactiveOrgs, setInactiveOrgs] = useState("");

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
        setInactiveOrgs(data.totalInactiveOrgs);
        setActiveOrgs(data.totalActiveOrgs);

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
                Office of Student Affair
              </h1>
              <p className="font-medium text-sm">
                Current Academic Year:{" "}
                {currentSemester && currentSemester.academicYear} -{" "}
                {semesterMap[currentSemester.semester]}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-3 ">
          <div className="w-full grid gap-2">
            <Card className="sm:shadow-none shadow-lg w-full">
              <CardHeader className="px-4 py-5">
                <CardTitle className="text-lg ">
                  <span className="flex items-center text-lg font-semibold ">
                    <Building
                      size={20}
                      className="mr-2"
                      style={{ color: "#8B5CF6" }}
                    />
                    Total Organizations
                  </span>
                </CardTitle>
                <p className="mt-1 text-2xl font-medium ">{orgData.length}</p>
              </CardHeader>
              <CardContent className={""}>
                <div className="space-x-2 h-full">
                  <span className="bg-green-200 text-green-600 font-semibold text-xs py-1 px-2 rounded-md">{`${activeOrgs.length} Active`}</span>
                  <span className="bg-red-200 text-red-600 font-semibold text-xs py-1 px-2 rounded-md">{`${inactiveOrgs.length} Inactive`}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="sm:shadow-none shadow-lg w-full ">
              <CardHeader className="px-4 py-5">
                <CardTitle className="text-lg ">
                  <span className="flex items-center text-lg font-semibold ">
                    <User2
                      size={20}
                      className="mr-2"
                      style={{ color: "#8B5CF6" }}
                    />
                    Total Admin
                  </span>
                </CardTitle>
                <p className="mt-1 text-2xl font-medium ">{adminData}</p>
                {/* <div className="space-x-2">
                  <span className="bg-green-200 text-green-600 font-semibold text-xs py-1 px-2 rounded-md">{`${activeOrgs.length} Active`}</span>
                  <span className="bg-red-200 text-red-600 font-semibold text-xs py-1 px-2 rounded-md">{`${inactiveOrgs.length} Inactive`}</span>
                </div> */}
              </CardHeader>
            </Card>
          </div>
          <div className="p-5 border border-zinc-300 w-min rounded-lg bg-[#fefefe]">
            <Calendar
              mode="single"
              // selected={date}
              // onSelect={setDate}
              className="w-full"
            />
          </div>

          {/* <div className="sm:border md:border-none h-full rounded-lg"> */}

          {/* </div> */}

          <div className=" text-gray-900 max-h-min w-full">
            <OrgChart data={orgData} />
          </div>
        </div>
        <div className="">
          <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
            <Label className="font-semibold text-xl">Organizations</Label>
            <DashboardTable data={orgData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminHomeContent;
