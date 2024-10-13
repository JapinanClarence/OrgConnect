import AttendanceTable from '@/components/attendance/AttendanceTable';
import React, {useEffect, useState} from 'react'
import apiClient from '@/api/axios';
import { formatSimpleDateTime, formatDate } from '@/util/helpers';
import { useNavigate } from 'react-router-dom';

const AttendancePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] =useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
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
  
  const handleClickEventRow = (data) =>{
    navigate(`/events/attendance/?eventId=${data.id}`)
  }

  return (
    <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Event Attendance Overview</h1>
      <p className="text-sm text-muted-foreground">
        Monitor and manage event attendance.
      </p>
      <AttendanceTable data={data} onClick={handleClickEventRow}/>
    </div>
  )
}

export default AttendancePage
