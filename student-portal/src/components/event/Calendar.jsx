import { useEffect, useState } from "react";
import "@schedule-x/theme-shadcn/dist/index.css";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createCalendar,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";

const Calendar = ({ currentEvents }) => {
  // const calendarRef = useRef(null);

  const calendar = useCalendarApp({
    defaultView: viewMonthAgenda.name,
    theme: "shadcn",
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    events: currentEvents,
    calendars: {
      0: {
        colorName: "red",
        lightColors: {
          main: "#f44336", // Red
          container: "#f8d7da", // Light red
          onContainer: "#d32f2f", // Dark red
        },
        darkColors: {
          main: "#e57373", // Light red for dark theme
          container: "#b71c1c", // Dark red container
          onContainer: "#f44336", // Red for dark theme
        },
      },
      1: {
        colorName: "yellow",
        lightColors: {
          main: "#ffeb3b", // Yellow
          container: "#fff9c4", // Light yellow
          onContainer: "#8B8000", // Dark yellow
        },
        darkColors: {
          main: "#fff59d", // Light yellow for dark theme
          container: "#f57f17", // Dark yellow container
          onContainer: "#ffeb3b", // Yellow for dark theme
        },
      },
      2: {
        colorName: "blue",
        lightColors: {
          main: "#2196f3", // Blue
          container: "#bbdefb", // Light blue
          onContainer: "#1976d2", // Dark blue
        },
        darkColors: {
          main: "#64b5f6", // Light blue for dark theme
          container: "#0d47a1", // Dark blue container
          onContainer: "#2196f3", // Blue for dark theme
        },
      },
      3: {
        colorName: "green",
        lightColors: {
          main: "#4caf50", // Green
          container: "#c8e6c9", // Light green
          onContainer: "#388e3c", // Dark green
        },
        darkColors: {
          main: "#81c784", // Light green for dark theme
          container: "#1b5e20", // Dark green container
          onContainer: "#4caf50", // Green for dark theme
        },
      },
    },
    plugins: [createEventModalPlugin()],
  });
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Calendar;
