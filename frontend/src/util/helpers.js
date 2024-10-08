export const formatDate = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};