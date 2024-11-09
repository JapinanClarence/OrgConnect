import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatSimpleDateTime, formatDate } from "@/util/helpers";

const statusMap = {
  "0": {
    name: "Close",
    color: "bg-red-500",
  },
  "1": {
    name: "Upcoming",
    color: "bg-yellow-500",
  },
  "2": {
    name: "Ongoing",
    color: "bg-blue-600",
  },
  "3": {
    name: "Open",
    color: "bg-green-600",
  },
};

const EventInfo = ({ loading, currentEvent, hideEvent }) => {
  const [badgeStatus, setBadgeStatus] = useState(null);

  useEffect(() => {
    // Once currentEvent is fetched, check and set the badge status
    if (currentEvent) {
      setBadgeStatus(statusMap[currentEvent.status]);
    }
  }, [currentEvent]);

  return (
    <>
      {loading ? (
        <div className="space-y-2 mb-3">
          <Skeleton className={"w-[300px] h-4"} />
          <Skeleton className={"w-[200px] h-4"} />
          <Skeleton className={"w-[500px] h-4"} />
          <Skeleton className={"w-[600px] h-4"} />
          <Skeleton className={"w-[400px] h-4"} />
        </div>
      ) : (
        <div className={`${hideEvent ? "hidden" : ""} leading-none mb-3`}>
          <h1 className="font-bold text-2xl inline-flex items-center gap-1">
            {currentEvent.title}{" "}
            {badgeStatus && (
              <Badge
                className={`${badgeStatus.color} hover:${badgeStatus.color} text-xs`}
              >
                {badgeStatus.name}
              </Badge>
            )}
          </h1>
          <span className="text-xs font-normal block">{`${formatSimpleDateTime(
            currentEvent.startDate
          )} - ${formatSimpleDateTime(currentEvent.endDate)}`}</span>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">
            {currentEvent.description
              ? currentEvent.description
              : "No description."}
          </p>
        </div>
      )}
    </>
  );
};

export default EventInfo;
