import React, { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnnouncementDialog from "./AnnouncementDialog";

const categoryMap = {
  0: { name: "General Info", color: "bg-blue-500" },
  1: { name: "Meetings", color: "bg-green-600" },
  2: { name: "Reminders", color: "bg-yellow-500" },
  3: { name: "News", color: "bg-purple-500" },
  4: { name: "Alerts", color: "bg-red-500" },
};

const AnnouncementCard = ({ id, title, description, category, datePosted, postedBy }) => {
  const [showDialog, setShowDialog] = useState(false);
  const categoryMap = {
    0: { name: "General Info", color: "bg-blue-500" },
    1: { name: "Meetings", color: "bg-green-600" },
    2: { name: "Reminders", color: "bg-yellow-500" },
    3: { name: "News", color: "bg-purple-500" },
    4: { name: "Alerts", color: "bg-red-500" },
  };

  const badgeCategory = categoryMap[category] || {
    name: "Unknown",
    color: "bg-gray-500",
  };
  const handleClick = () => {
    setShowDialog(true);
  };
  return (
    <>
      <Card
        key={id}
        className="shadow-sm border border-slate-200"
        onClick={handleClick}
      >
        <CardContent className="p-3 md:p-5">
          <CardHeader className="flex text-xs flex-col md:flex-row p-0">
            <span className="font-bold text-xs mr-2">Posted on:</span>
            {datePosted}
          </CardHeader>

          <CardTitle className="text-md">
            {title}
            {badgeCategory && (
              <Badge
                className={`ml-2 hidden md:inline ${badgeCategory.color} text-white hover:${badgeCategory.color}`}
              >
                {badgeCategory.name}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-pretty md:text-wrap overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
            {description.length > 50
              ? `${description.slice(0, 100)}...`
              : description}
          </CardDescription>
          <CardFooter className="inline md:hidden p-0">
            {badgeCategory && (
              <Badge className={`${badgeCategory.color} text-white`}>
                {badgeCategory.name}
              </Badge>
            )}
          </CardFooter>
        </CardContent>
      </Card>
      <AnnouncementDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title={title}
        description={description}
        category={badgeCategory}
        datePosted={datePosted}
        postedBy={postedBy}
      />
    </>
  );
};

export default AnnouncementCard;
