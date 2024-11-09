import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import EventDialog from "./EventDialog";
import { timeOnly, shortMonth } from "@/util/helpers";
import { Badge } from "@/components/ui/badge";

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

const EventCards = ({
  title,
  description,
  location,
  startDate,
  endDate,
  postedBy,
  status
}) => {
  const [badgeStatus, setBadgeStatus] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(true);
  };

  const processedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;


  const date = preProcessDate(startDate, endDate);
  
  useEffect(() => {
    // set the badge status
    if (status) {
      setBadgeStatus(statusMap[status]);
    }
  }, [status]);
  function preProcessDate (startDate, endDate) {
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
    <>
      <Card onClick={handleClick}>
        <CardHeader className="p-4 pb-0 mb-2 ">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <CardDescription className="mb-2 text-pretty">
            {processedDescription ? processedDescription : "No description."}
          </CardDescription>
          <p className="text-sm">
            <Calendar size={13} strokeWidth={2} className=" inline mr-1" />{" "}
            {date}
          </p>
          <p className="text-sm">
            {" "}
            <MapPin size={13} strokeWidth={2} className=" inline mr-1" />{" "}
            {location}
          </p>
          {badgeStatus && (
              <Badge
                className={`${badgeStatus.color} hover:${badgeStatus.color} text-xs w-min mt-2`}
              >
                {badgeStatus.name}
              </Badge>
            )}
        </CardContent>
      </Card>
      <EventDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title={title}
        description={description}
        location={location}
        date={date}
        badgeStatus={badgeStatus}
        postedBy={postedBy}
      />
    </>
  );
};

export default EventCards;
