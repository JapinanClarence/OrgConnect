import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useEffect } from "react";

const EventCalendar = ({ onDateClick, currentEvents }) => {
  const calendarRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      const calendarApi = calendarRef.current.getApi(); // Get the FullCalendar API
      const width = window.innerWidth;
      let calendarHeight = "auto";

      // Adjust header toolbar based on screen size
      if (width < 768) {
        calendarApi.setOption("headerToolbar", {
          start: "prev,next",
          center: "title",
          end: "dayGridMonth,listMonth",
        });
        calendarHeight = "88vh";
        // calendarApi.setOption("initialView",
        //   "dayGridMonth"
        // )
      } else if (width < 1024) {
        calendarApi.setOption("headerToolbar", {
          start: "prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        });
        calendarHeight = "80vh";
      } else {
        calendarApi.setOption("headerToolbar", {
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        });
        calendarHeight = "80vh";
      }
      calendarApi.setOption("height", calendarHeight);
    };

    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);

    // Initial call to handle screen size on load
    handleResize();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <FullCalendar
      ref={calendarRef} // Attach ref to FullCalendar component
      height="100%"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        // Full header for larger screens
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      }}
      initialView="dayGridMonth"
      events={currentEvents}
      eventBackgroundColor="#2c5039"
      eventBorderColor="transparent"
      editable={false}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={onDateClick}
      // eventClick={onEventClick}
      unselectAuto={true}
      nowIndicator={true}
    />
  );
};

export default EventCalendar;
