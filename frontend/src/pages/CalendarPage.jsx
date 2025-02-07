import { useEffect, useState } from "react";
import EventCalendar from "@/components/events/EventCalendar";
import { dateOnly, dateOnlyISO, formatDate } from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";


const CalendarPage = () => {
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const date = formatDate(Date.now());
  const { token } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await apiClient.get("/admin/event/", {
        headers: {
          Authorization: token,
        },
      });

      if (!data.success) {
        setCurrentEvents([]);
      } else {
        const events = data.data;

        setCurrentEvents(
          events.map((event) => ({
            id: event._id,
            title: event.title,
            start: dateOnlyISO(event.startDate),
            end: dateOnlyISO(event.endDate),
            description: event.description,
            calendarId: event.status,
            location: event.location,
          }))
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white md:shadow-lg md:rounded-lg border border-gray-200 text-gray-900 p-5 md:flex gap-2">
        <div className="rounded bg-gray-900 bg-opacity-10 md:w-[100px]"></div>
        <div className="md:w-full">
          {loading ? (
            <div>Loading events...</div> // Display a loading message while fetching events
          ) : (
            <EventCalendar currentEvents={currentEvents} />
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
