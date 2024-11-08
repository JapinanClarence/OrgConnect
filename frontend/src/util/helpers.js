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

export const formatSimpleDateTime = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-US", {
    year: "numeric",      // Full year
    month: "2-digit",     // 2-digit month (MM)
    day: "2-digit",       // Day of the month with leading zero (DD)
    hour: "numeric",      // Hour in 12-hour format
    minute: "numeric",    // Minutes
    hour12: true          // AM/PM format
  });
};

export const formatSimpleDate = (dateString) =>{
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-US", {
    year: "numeric",      // Full year
    month: "long",     // full month
    day: "2-digit",       // Day of the month with leading zero (DD)
  });
}
export const dateOnly = (dateString) =>{
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-US", {
    year: "numeric",      // Full year
    month: "2-digit",     // 2-digit month (MM)
    day: "2-digit",       // Day of the month with leading zero (DD)
  });
}