import React, { useEffect, useState } from "react";
import PageHead from "@/components/nav/PageHead";
import apiClient from "@/api/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import EventCards from "@/components/event/EventCards";
import { shortMonth, timeOnly } from "@/util/helpers";
import EventSkeleton from "@/components/skeleton/EventSkeleton";

const EventsPage = () => {
  const [eventData, setEventData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(
        `/user/organization/${params.id}/events`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

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
        setEventData(cleanedData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="pt-16">
      <PageHead title={"Events"} />
      <div className="px-5">
        <div className="space-y-2">
          {loading ? (
            <EventSkeleton items={5} />
          ) : eventData <= 0 ? (
            <div className="w-full py-10 flex justify-center content-center text-muted-foreground">
              No recent events
            </div>
          ) : (
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
    </div>
  );
};

export default EventsPage;
