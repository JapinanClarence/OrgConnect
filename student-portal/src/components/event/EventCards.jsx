import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

const EventCards = ({ title, description, location, date }) => {
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <CardDescription className="mb-2 text-pretty">
          {description ? description : "No description."}
        </CardDescription>
        <p className="text-sm">
          <Calendar size={13} strokeWidth={2} className=" inline mr-1" /> {date}
        </p>
        <p className="text-sm">
          {" "}
          <MapPin size={13} strokeWidth={2} className=" inline mr-1" /> {location}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCards;
