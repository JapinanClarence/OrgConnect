import EventSkeleton from "@/components/skeleton/EventSkeleton";
import React, { useEffect, useState } from "react";
import EventCards from "@/components/event/EventCards";

const OngoingTab = ({ loading, eventData }) => {
  return (
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
            status={data.status}
            postedBy={data.organization.name}
            eventFee={data.fee}
          />
        ))
      )}
    </div>
  );
};

export default OngoingTab;
