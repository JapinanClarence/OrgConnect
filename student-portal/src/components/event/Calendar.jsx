import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useEffect } from "react";

const Calendar = ({ currentEvents, onEventClick }) => {
  const calendarRef = useRef(null);
  return (
    <FullCalendar
      ref={calendarRef} // Attach ref to FullCalendar component
      height="80%"
      plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        start: "prev,next",
        center: "title",
        end: "dayGridMonth,listMonth",
      }}
      initialView="listMonth"
      events={currentEvents}
      eventBackgroundColor="#2c5039"
      eventBorderColor="transparent"
      editable={false}
      selectable={false}
      selectMirror={false}
      dayMaxEvents={true}
    //   eventClick={onEventClick}
      unselectAuto={false}
      nowIndicator={true} 
    />
  );
};

export default Calendar;
