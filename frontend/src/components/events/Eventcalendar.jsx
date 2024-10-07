import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

const EventCalendar = ({ onDateClick, currentEvents, onEventClick }) => {
  return (
    <FullCalendar
      height="100%"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      }}
      initialView="timeGridWeek"
      events={currentEvents}
      editable={false}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={onDateClick}
      eventClick={onEventClick}
      unselectAuto={true}
      nowIndicator={true}
    />
  );
};

export default EventCalendar;
