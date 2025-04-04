// utils/formatDate.js
export const formatDate = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-PH", {
    weekday: "long", // Sunday, Monday, etc.
    year: "numeric", // Full year
    month: "long", // Full month name
    day: "2-digit", // Day of the month with leading zero
    hour: "numeric", // Hour in 12-hour format
    minute: "numeric", // Minutes
    hour12: true, // AM/PM format
    timeZone: "Asia/Manila",
  });
};

export const formatSimpleDateTime = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-PH", {
    year: "numeric", // Full year
    month: "2-digit", // 2-digit month (MM)
    day: "2-digit", // Day of the month with leading zero (DD)
    hour: "numeric", // Hour in 12-hour format
    minute: "numeric", // Minutes
    hour12: true, // AM/PM format
    timeZone: "Asia/Manila",
  });
};

export const formatSimpleDate = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-PH", {
    year: "numeric", // Full year
    month: "long", // full month
    day: "2-digit", // Day of the month with leading zero (DD)
    timeZone: "Asia/Manila",
  });
};
export const dateOnly = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-PH", {
    year: "numeric", // Full year
    month: "2-digit", // 2-digit month (MM)
    day: "2-digit", // Day of the month with leading zero (DD)
    timeZone: "Asia/Manila",
  });
};
export const dateOnlyISO = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  const options = { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-PH", options).format(date);

  // Ensure the format is "YYYY-MM-DD" as Intl.DateTimeFormat might return "MM/DD/YYYY" in some locales
  const [month, day, year] = formattedDate.split("/");
  return `${year}-${month}-${day}`;
};
