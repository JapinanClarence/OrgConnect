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

      if (!data.success) {
        setEventData([]);
      } else {
        const event = data.data;

        setEventData(event);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              key={data._id}
              title={data.title}
              description={data.description}
              date={data.date}
              startDate={data.startDate}
              endDate={data.endDate}
              location={data.location}
              postedBy={data.organization.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
