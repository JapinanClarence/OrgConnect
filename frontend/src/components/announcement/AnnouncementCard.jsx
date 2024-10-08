import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const categoryMap = {
  0: { name: "General Info", color: "bg-blue-500" },
  1: { name: "Meetings", color: "bg-green-600" },
  2: { name: "Reminders", color: "bg-yellow-500" },
  3: { name: "News", color: "bg-purple-500" },
  4: { name: "Alerts", color: "bg-red-500" },
};
const AnnouncementCard = ({ id, title, description, datePosted, category }) => {
  const [badgeCategory, setBadgeCategory] = useState({ name: "", color: "" });

  useEffect(() => {
    // Set badge details based on the category
    if (categoryMap[category]) {
      setBadgeCategory(categoryMap[category]);
    }
  }, [category]);
  return (
    <Card className="shadow-sm border-zinc-300">
      <CardContent className="p-4 md:p-5">
        <CardHeader className="flex text-xs flex-col md:flex-row p-0">
          <span className="font-bold text-xs mr-2">Posted on:</span>
          {datePosted}
        </CardHeader>

        <CardTitle className="text-md">
          {title}
          <Badge
            className={`ml-2 hidden md:inline ${badgeCategory.color} text-white`}
          >
            {badgeCategory.name}
          </Badge>
        </CardTitle>
        <CardDescription className="text-pretty md:text-wrap overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
          {description.length > 50
            ? `${description.slice(0, 100)}...`
            : description}
        </CardDescription>
        <CardFooter className="inline md:hidden p-0">
          <Badge
            className={`${badgeCategory.color} text-white`}
          >
            {badgeCategory.name}
          </Badge>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
