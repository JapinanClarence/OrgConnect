import React, { useEffect, useState } from "react";
import apiClient from "@/api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogBody, DialogFooter } from "@material-tailwind/react";

const AnnouncementDetails = ({ announcementData, open, onOpenChange }) => {
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    0: { name: "General Info", color: "bg-blue-500" },
    1: { name: "Meetings", color: "bg-green-600" },
    2: { name: "Reminders", color: "bg-yellow-500" },
    3: { name: "News", color: "bg-purple-500" },
    4: { name: "Alerts", color: "bg-red-500" },
  };

  const category = categoryMap[announcementData.category] || {
    name: "Unknown",
    color: "bg-gray-500",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-8 ">
        <DialogHeader className="text-start pb-2 border-b-[1px] border-zinc-300">
          {/* <h1 className="text-sm font-bold">Title</h1> */}
          <DialogTitle className="">{announcementData.title}</DialogTitle>
          <div className="space-x-2">
            <span className="text-xs">{announcementData.datePosted}</span>
            <span
              className={`text-xs px-3 font-bold text-white w-min rounded-md ${category.color}`}
            >
              {category.name}
            </span>
          </div>
        </DialogHeader>
        <DialogBody className="p-0 space-y-2 pb-2 border-b-[1px] border-zinc-300">
          <div>
            <h1 className="text-sm font-bold">Description</h1>
            <DialogDescription className="mt-2">
              {announcementData.description}
            </DialogDescription>
          </div>
        </DialogBody>
        <DialogFooter className="justify-start p-0">
          <Button variant="link" className="w-min p-0 font-bold">
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDetails;
