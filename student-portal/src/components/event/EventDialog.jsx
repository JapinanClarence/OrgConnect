import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const EventDialog = ({
  title,
  description = "No description.",
  location,
  date,
  postedBy,
  badgeStatus,
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

        <DialogFooter>
          <div>
            <h1 className="text-muted-foreground text-xs">Event by:</h1>
            <p className="text-gray-900 font-semibold text-sm">{postedBy}</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
