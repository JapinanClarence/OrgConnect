import React, { useEffect, useState } from "react";
import EventCards from "@/components/home/EventCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { timeOnly, shortMonth } from "@/util/helpers";
import EventSkeleton from "@/components/skeleton/EventSkeleton";
import PageHead from "@/components/nav/PageHead";
import Header from "@/components/nav/Header";
import Calendar from "@/components/event/Calendar";

const CalendarPage = () => {
  const { token, userData } = useAuth();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data } = await apiClient.get("/user/events/", {
        headers: {
          Authorization: token,
        },
      });
      if (!data.success) {
        setEventData([]);
      } else {
        const events = data.data;
        setEventData(
          events.map((event) => ({
            id: event._id,
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            description: event.description,
            active: event.active,
            location: event.location,
          }))
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="mt-16 pb-5 px-5 h-full">
      <Header />

      <div className="py-5 h-full">
        <Calendar currentEvents={eventData} />
      </div>
    </div>
  );
};

export default CalendarPage;
