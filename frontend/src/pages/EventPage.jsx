import { useEffect, useState } from "react";
import EventCalendar from "@/components/events/EventCalendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/schema";
import apiClient from "@/api/axios";
import EditEventDialog from "@/components/events/EditEventDialog";
import AddEventDialog from "@/components/events/AddEventDialog";
import { useToast } from "@/hooks/use-toast";
import {
  dateOnly,
  formatDate,
  formatSimpleDate,
  formatSimpleDateTime,
} from "@/util/helpers";
import { useAuth } from "@/context/AuthContext";
import EventsTable from "@/components/events/EventsTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const [showAddEvent, setShowAddEventDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const date = formatDate(Date.now());
  const { token } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      fee: "",
      organizer: "",
    },
  });

  const handleEditDialog = (data) => {
    setShowEditDialog(true);
    setSelectedEvent(data);
  };

  const onAdd = async (data) => {
    try {
      setIsSubmitting(true);
      const {
        title,
        description,
        location,
        startDate,
        endDate,
        fee,
        organizer,
      } = EventSchema.parse(data);

      const formData = {
        title,
        description,
        location,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        fee,
        organizer,
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

  const handleDeleteDialog = (data) => {
    setShowAlert(true);
    setSelectedEvent(data);
  };

  const confirmDelete = () => {
    onDelete(selectedEvent); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };

  const onDelete = async (eventId) => {
    try {
      const response = await apiClient.delete(`/admin/event/${eventId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response) {
        await fetchEvents();
        setIsDeleting(false);
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

  const onEdit = async ({
    title,
    description,
    location,
    status,
    startDate,
    endDate,
    fee,
    organizer,
  }) => {
    try {
      const formData = {
        title,
        description,
        location,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        fee,
        organizer,
        status,
      };
      setIsSubmitting(true);
      const res = await apiClient.patch(
        `/admin/event/${selectedEvent.id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchEvents();
        setIsSubmitting(false);
        setShowEditDialog(false);
        form.reset();

        toast({
          title: `Event has been updated`,
          description: `${date}`,
        });
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  const handleManageAttendance = async (data) => {
    navigate(`/events/attendance/?eventId=${data}`);
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
          events.map((event) => {
            return {
              id: event._id,
              title: event.title,
              startDate: formatDate(event.startDate),
              endDate: formatDate(event.endDate),
              description: event.description,
              status: event.status,
              location: event.location,
              fee: event.fee ? event.fee.toString() : "0",
              organizer: event.organizer,
            };
          })
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
      <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
        <h1 className="font-bold">Events</h1>
        <p className="text-sm text-muted-foreground">
          View and manage events here.
        </p>
        <EventsTable
          onAdd={setShowAddEventDialog}
          data={currentEvents}
          onEdit={handleEditDialog}
          onDelete={handleDeleteDialog}
          onManageAttendance={handleManageAttendance}
        />
      </div>

      <EditEventDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={onEdit}
        eventData={selectedEvent}
        isDeleting={isDeleting}
      />
      <AddEventDialog
        form={form}
        open={showAddEvent}
        onOpenChange={setShowAddEventDialog}
        onSubmit={onAdd}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventPage;
