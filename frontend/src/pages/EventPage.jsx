import { useEffect, useState } from "react";
import EventCalendar from "@/components/events/EventCalendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/schema";
import apiClient from "@/api/axios";
import EditEventDialog from "@/components/events/EditEventDialog";
import AddEventDialog from "@/components/events/AddEventDialog";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";

const EventPage = () => {
  const [showAddEvent, setShowAddEventDialog] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const date = formatDate(Date.now());
  const { token } = useAuth();

  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  });

  const handleDateClick = (selected) => {
    setShowAddEventDialog(true);

    // Set the start and end dates
    setStartDate(selected.startStr);
    setEndDate(selected.endStr);
  };

  const handleEventClick = (selected) => {
    const eventData = {
      id: selected.event.id,
      title: selected.event.title,
      startDate: selected.event.startStr,
      endDate: selected.event.endStr,
      description: selected.event.extendedProps.description,
      location: selected.event.extendedProps.location,
      active: selected.event.extendedProps.active,
    };
    setSelectedEvent(eventData); // Store selected event data
    setShowEventInfo(true); // Show the dropdown
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const { title, description, location } = EventSchema.parse(data);

      const formData = {
        title,
        description,
        location,
        startDate,
        endDate,
      };

      const response = await apiClient.post("/admin/event", formData, {
        headers: {
          Authorization: token,
        },
      });
      if (response) {
        await fetchEvents();
        setIsSubmitting(false);
        setShowAddEventDialog(false);
        form.reset();
        toast({
          title: "Event has been created",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  const onEdit = async (data) => {
    try {
      setIsSubmitting(true);
      const { id, title, description, location, startDate, endDate, active } =
        EventSchema.parse(data);

      const formData = {
        title,
        description,
        location,
        startDate,
        endDate,
        active,
      };

      const response = await apiClient.patch(
        `/admin/event/${selectedEvent.id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response) {
        await fetchEvents();
        setIsSubmitting(false);
        setShowEventInfo(false);
        form.reset();
        toast({
          title: "Event updated",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  const handleDelete = async (eventId) => {
    try {
      const response = await apiClient.delete(`/admin/event/${eventId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response) {
        await fetchEvents();
        setIsDeleting(false);
        setShowEventInfo(false);
        form.reset();
        toast({
          title: "Event deleted",
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

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
            active: event.active,
            location: event.location,
          }))
        );
      }
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setLoading(false)
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
            onDateClick={handleDateClick}
            currentEvents={currentEvents}
            onEventClick={handleEventClick}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <EditEventDialog
        open={showEventInfo}
        onOpenChange={setShowEventInfo}
        onSubmit={onEdit}
        eventData={selectedEvent}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
      <AddEventDialog
        form={form}
        open={showAddEvent}
        onOpenChange={setShowAddEventDialog}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default EventPage;
