import AttendanceTable from '@/components/attendance/AttendanceTable';
import React, {useEffect, useState} from 'react'
import apiClient from '@/api/axios';
import { formatSimpleDateTime, formatDate } from '@/util/helpers';
  
const AttendancePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] =useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const { data } = await apiClient.get("/admin/event", {
        headers: {
          Authorization: user.token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => (
          {
          id: data._id,
          title: data.title,
          description: data.description,
          location:data.location,
          start: formatSimpleDateTime(data.startDate),
          end: formatSimpleDateTime(data.endDate),
          active:data.active
        }));
        setData(tableData);
      }
      console.log(data)

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-[#fefefe] shadow-lg rounded-lg border border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Event Attendance Table</h1>
      <p className="text-sm text-muted-foreground">
        Manage your event attendance here
      </p>
      <AttendanceTable data={data}/>
    </div>
  )
}

export default AttendancePage
