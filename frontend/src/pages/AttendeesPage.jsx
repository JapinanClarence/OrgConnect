import React from "react";
import { useLocation } from "react-router-dom";

const AttendeesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("eventId");

  return <div>hello</div>;
};

export default AttendeesPage;
