import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import apiClient from "@/api/axios";
import { formatSimpleDateTime, formatDate } from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";
import EventInfo from "@/components/attendance/EventInfo";
import QrScanner from "@/components/attendance/QrScanner";
import { useToast } from "@/hooks/use-toast";
const yearMap = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
};

const AttendancePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("eventId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEvent, setCurrentEvent] = useState("");
  const { token } = useAuth();
  const [showScanner, setShowScanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const date = formatDate(Date.now());
  const { toast } = useToast();
  useEffect(() => {
    fetchAttendees();
    fetchCurrentEvent();
  }, []);

  const fetchCurrentEvent = async () => {
    try {
      const { data } = await apiClient.get(`/admin/event/${eventId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        const eventData = {
          id: data.data._id,
          title: data.data.title,
          description: data.data.description,
          location: data.data.location,
          startDate: data.data.startDate,
          endDate: data.data.endDate,
          status: data.data.active,
        };
        setCurrentEvent(eventData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchAttendees = async () => {
    try {
      const { data } = await apiClient.get(`/attendance/${eventId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setData([]);
      } else {
        const tableData = data.data.map((data) => ({
          id: data._id,
          studentId: data.studentId,
          fullname: data.fullname,
          email: data.email,
          year: yearMap[data.year],
          course: data.course,
          profilePicture: data.profilePicture,
          checkIn: formatSimpleDateTime(data.checkIn),
          checkOut: data.checkOut ? formatSimpleDateTime(data.checkOut) : null,
        }));
        setData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };

  const markAttendance = async (data) => {
    const formData = {
      studentId: data[0].rawValue,
      eventId: currentEvent.id,
    };

    try {
      const { data } = await apiClient.post(`/attendance`, formData, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        fetchAttendees();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: `${date}`,
      });
    }
  };

  return (
    <div className="  text-gray-900 gap-3 md:grid grid-flow-col grid-cols-10  ">
      <div className="col-span-4 max-h-min md:bg-[#fefefe] md:shadow-lg md:rounded-lg md:border md:border-gray-200 p-5">
        <EventInfo
          currentEvent={currentEvent}
          loading={loading}
          hideEvent={showScanner}
        />
        <QrScanner
          open={showScanner}
          onScan={markAttendance}
          onError={(data) => setErrorMessage(data)}
        />
      </div>
      <div className="col-span-6 md:bg-[#fefefe] md:shadow-lg md:rounded-lg md:border md:border-gray-200 p-5">
        <AttendanceTable
          data={data}
          loading={loading}
          showScanner={(data) => setShowScanner(data)}
          isShowing={showScanner}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
