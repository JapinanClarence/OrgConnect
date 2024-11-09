import PageHead from "@/components/nav/PageHead";
import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import DataTable from "@/components/table/DataTable";
import { attendanceColumn } from "@/components/table/columns";
import { formatSimpleDateTime } from "@/util/helpers";
const AttendancePage = () => {
  const { token } = useAuth();
  const [attenanceData, setAttendanceData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(`/user/attendance`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      if (!data.success) {
        setAttendanceData([]);
      } else {
        const tableData = data.data.map((data) => ({
          id: data.id,
          title: data.title,
          checkIn: data.checkIn ? formatSimpleDateTime(data.checkIn) : null,
          checkOut: data.checkOut ? formatSimpleDateTime(data.checkOut) : null,
          location: data.location,
          organizationName: data.organizationName,
          status: data.status,
          attendanceStatus: data.attendanceStatus
        }));
        setAttendanceData(tableData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-16 h-full gap-5">
      <PageHead title={"Attendance"} />
      <div className="px-5">
        <DataTable
          data={attenanceData}
          loading={loading}
          filterColumns={["title", "organizationName", "location", "status", "attendanceStatus"]}
          columns={attendanceColumn}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
