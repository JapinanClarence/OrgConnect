import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import AttendeesTable from "@/components/attendance/AttendeesTable";
import apiClient from "@/api/axios";
import { formatSimpleDateTime, formatDate } from '@/util/helpers';

const AttendeesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("eventId");
  const [data, setData] = useState([]);
  const [loading, setLoading] =useState(false);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const { data } = await apiClient.get(`/attendance/${eventId}`, {
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
          studentId: data.studentId,
          fullname: data.fullname,
          email:data.email,
          course:data.course,
          profilePicture:data.profilePicture,
          checkIn: formatSimpleDateTime(data.checkIn),
          checkOut: formatSimpleDateTime(data.checkOut),
        
        }));
        setData(tableData);
      }
      

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#fefefe] shadow-lg rounded-lg border border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
    <h1 className="font-bold">Attendee Management</h1>
    <p className="text-sm text-muted-foreground text-pretty">
        View and manage the list of attendees for your events. Keep track of attendance and engagement.
    </p>
    <AttendeesTable data={data} />
  </div>  
);
};

export default AttendeesPage;
