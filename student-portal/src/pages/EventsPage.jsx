import React, { useEffect, useState } from "react";
import EventCards from "@/components/home/EventCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { timeOnly, shortMonth } from "@/util/helpers";
import EventSkeleton from "@/components/skeleton/EventSkeleton";
import PageHead from "@/components/nav/PageHead";

const EventsPage = () => {
    const { token, userData } = useAuth();
    const [orgData, setOrgData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    
  const fetchEvents = async () => {
    try {
      const { data } = await apiClient.get("/user/events/", {
        headers: {
          Authorization: token,
        },
      });
      if (data) {
        const event = data.data;
        const cleanedData = event.map((data) => {
          const date = preProcessDate(data.startDate, data.endDate);
          return {
            id: data._id,
            title: data.title,
            description:
              data.description.length > 100
                ? `${data.description.slice(0, 100)}...`
                : data.description,
            location: data.location,
            date,
          };
        });
        setEventData(cleanedData.slice(0, 10));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const preProcessDate = (startDate, endDate) => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const s = sDate.toLocaleString("en-US", {
      year: "numeric", // Full year
      month: "2-digit", // 2-digit month (MM)
      day: "2-digit", // Day of the month with leading zero (DD)
    });
    const e = eDate.toLocaleString("en-US", {
      year: "numeric", // Full year
      month: "2-digit", // 2-digit month (MM)
      day: "2-digit", // Day of the month with leading zero (DD)
    });

    if (s !== e) {
      return `${sDate} - ${eDate}`;
    } else {
      return `${shortMonth(startDate)} - ${timeOnly(endDate)}`;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="py-16">


      <div className="px-5 mt-5 space-y-2">
        {loading ? (
          <EventSkeleton items={5} />
        ) : (
          eventData &&
          eventData.map((data) => (
            <EventCards
              key={data.id}
              title={data.title}
              description={data.description}
              date={data.date}
              location={data.location}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;
