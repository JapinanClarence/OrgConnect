// utils/formatDate.js
export const formatDate = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-US", {
    weekday: "long",      // Sunday, Monday, etc.
    year: "numeric",      // Full year
    month: "long",        // Full month name
    day: "2-digit",       // Day of the month with leading zero
    hour: "numeric",      // Hour in 12-hour format
    minute: "numeric",    // Minutes
    hour12: true          // AM/PM format
  });
};