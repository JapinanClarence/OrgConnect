import { useEffect, useState } from "react";
import EventCalendar from "@/components/events/EventCalendar";
import { formatDate } from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import EventDialog from "@/components/events/EventDialog";

const CalendarPage = () => {
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const date = formatDate(Date.now());
  const { token } = useAuth();

  // const handleEventClick = (selected) => {
  //   const eventData = {
  //     id: selected.event.id,
  //     title: selected.event.title,
  //     startDate: selected.event.startStr,
  //     endDate: selected.event.endStr,
  //     description: selected.event.extendedProps.description,
  //     location: selected.event.extendedProps.location,
  //     status: selected.event.extendedProps.status,
  //   };
  //   setSelectedEvent(eventData); // Store selected event data
  //   setShowEventInfo(true); // Show the dropdown
  // };

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
            start: event.startDate,
            end: event.endDate,
            description: event.description,
            status: event.status,
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

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <div className="bg-white md:shadow-lg md:rounded-lg border border-gray-200 text-gray-900 p-5 md:flex gap-2">
        <div className="rounded bg-gray-900 bg-opacity-10 md:w-[100px]"></div>
        <div className="md:w-full">
          <EventCalendar
            currentEvents={currentEvents}
            // onEventClick={handleEventClick}
          />
        </div>
      </div>

      {/* <EventDialog open={showEventInfo} onOpenChange={setShowEventInfo} eventData={selectedEvent}/> */}

    </>
  );
};

export default CalendarPage;
