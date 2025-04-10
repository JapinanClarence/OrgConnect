import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar, MapPin, PhilippinePeso } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const positionMap = {
  1: "Governor",
  3: "Secretary",
};

const EventDialog = ({
  title,
  description = "No description.",
  location,
  date,
  eventBy,
  postedBy,
  badgeStatus,
  eventFee,
  organizer,
  open,
  onOpenChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 200; // Character limit for collapsed state
  const isLongDescription = description.length > previewLength;

  const handleToggleContent = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-5 max-w-[340px] rounded-lg">
        <DialogHeader className="text-start">
          <DialogTitle>
            {title}
            {badgeStatus && (
              <Badge
                className={`${badgeStatus.color} hover:${badgeStatus.color} text-xs w-min ml-2`}
              >
                {badgeStatus.name}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-pretty inline-flex flex-col">
            {description
              ? isLongDescription && !expanded
                ? `${description.slice(0, previewLength)}...`
                : description
              : "No Description"}

            {description
              ? isLongDescription && (
                  <Button
                    onClick={handleToggleContent}
                    variant="link"
                    className="p-0 justify-start font-semibold w-min"
                  >
                    {expanded ? "See less" : "See more"}
                  </Button>
                )
              : ""}
          </DialogDescription>
        </DialogHeader>

        <div>
          <p className="text-sm">
            <Calendar size={13} strokeWidth={2} className="inline mr-1" />
            {date}
          </p>
          <p className="text-sm">
            <MapPin size={13} strokeWidth={2} className="inline mr-1" />
            {location}
          </p>
        </div>
        <div>
          <h1 className="text-muted-foreground text-xs">Event Fee:</h1>
          <div className="text-gray-900 font-semibold text-sm inline-flex items-center">
            {eventFee ? (
              <>
                <PhilippinePeso className="" size={14} /> {eventFee}
              </>
            ) : (
              "Free"
            )}
          </div>
        </div>
        <div>
          <h1 className="text-muted-foreground text-xs">Organizer:</h1>
          <div className="text-gray-900 font-semibold text-sm r">
            {organizer}
          </div>
        </div>
        <DialogFooter>
          <div>
            <h1 className="text-muted-foreground text-xs">Event by:</h1>
            <p className="text-gray-900 font-semibold text-sm">{eventBy}</p>
          </div>
          <div>
            <h1 className="text-muted-foreground text-xs">Posted by:</h1>
            <p className="text-gray-900 font-semibold text-sm">
              {positionMap[postedBy]}
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
