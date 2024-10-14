import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AttendanceTable from "../components/attendance/AttendanceTable";
import apiClient from "../api/axios";
import { formatSimpleDateTime, formatDate } from "../util/helpers";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";

const statusMap = {
  true: {
    name: "Open",
    color: "bg-green-600",
  },
  false: {
    name: "Close",
    color: "bg-red-500",
  },
};

const AttendeesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("eventId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEvent, setCurrentEvent] = useState("");
  const [badgeStatus, setBadgeStatus] = useState(null);

  useEffect(() => {
    fetchAttendees();
    fetchCurrentEvent();
  }, []);

  useEffect(() => {
    // Once currentEvent is fetched, check and set the badge status
    if (currentEvent && typeof currentEvent.status === "boolean") {
      setBadgeStatus(statusMap[currentEvent.status]);
    }
  }, [currentEvent]);

  const fetchCurrentEvent = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));

    try {
      const { data } = await apiClient.get(`/admin/event/${eventId}`, {
        headers: {
          Authorization: user.token,
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
        const tableData = data.data.map((data) => ({
          id: data._id,
          studentId: data.studentId,
          fullname: data.fullname,
          email: data.email,
          course: data.course,
          profilePicture: data.profilePicture,
          checkIn: formatSimpleDateTime(data.checkIn),
          checkOut: formatSimpleDateTime(data.checkOut),
        }));
        setData(tableData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };
  return (
    <div className="md:bg-[#fefefe] md:shadow-lg md:rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      {loading ? (
        <div className="space-y-2 mb-3">
          <Skeleton className={"w-[300px] h-4"} />
          <Skeleton className={"w-[200px] h-4"} />
          <Skeleton className={"w-[500px] h-4"} />
          <Skeleton className={"w-[600px] h-4"} />
          <Skeleton className={"w-[400px] h-4"} />
        </div>
      ) : (
        <div className="leading-none mb-3">
          <h1 className="font-bold text-2xl inline-flex items-center gap-1">
            {currentEvent.title}{" "}
            {badgeStatus && (
              <Badge
                className={`${badgeStatus.color} hover:${badgeStatus.color} text-xs`}
              >
                {badgeStatus.name}
              </Badge>
            )}
          </h1>
          <span className="text-xs font-normal block">{`${formatSimpleDateTime(
            currentEvent.startDate
          )} - ${formatSimpleDateTime(currentEvent.endDate)}`}</span>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">
            {currentEvent.description}
          </p>
        </div>
      )}

      <AttendanceTable data={data} loading={loading}/>
    </div>
  );
};

export default AttendeesPage;
