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
export const shortMonth = (dateString) =>{
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
      year: "numeric",      // Full year
      month: "short",     // 2-digit month (MM)
      day: "2-digit",  
      hour: "numeric",      // Hour in 12-hour format
      minute: "numeric",    // Minutes
      hour12: true        // Day of the month with leading zero (DD)
    })
}
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


export const formatToDateInput = (date) => {
  if (!date) return ""; // Handle the case when there's no date
  return new Date(date).toISOString().split("T")[0]; // Formats the date to "yyyy-MM-dd"
};
export const dateOnly = (dateString) =>{
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-US", {
    year: "numeric",      // Full year
    month: "2-digit",     // 2-digit month (MM)
    day: "2-digit",       // Day of the month with leading zero (DD)
  });
}
export const timeOnly = (dateString) =>{
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-US", {
    hour: "numeric",      // Hour in 12-hour format
    minute: "numeric",    // Minutes
    hour12: true   
  });
}
export const dateOnlyISO = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  const year = date.getFullYear(); // Get the full year
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month and pad with leading zero
  const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero
  return `${year}-${month}-${day}`;
};
