import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const EventDialog = ({ open, onOpenChange, eventData }) => {
  const statusMap = {
    0: { name: "Close", color: "bg-blue-500" },
    1: { name: "Pending", color: "bg-green-600" },
    2: { name: "Ongoing", color: "bg-yellow-500" },
    3: { name: "Open", color: "bg-purple-500" },
  };

  const status = statusMap[eventData.status] || {
    name: "Unknown",
    color: "bg-gray-500",
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[400px] lg:w-[500px] bg-white">
          <DialogHeader>
            <div className="space-x-2">
              <DialogTitle className="inline">{eventData.title}</DialogTitle>
              <Badge
                className={`text-white ${status.color} hover:${status.color}`}
              >
                {status.name}
              </Badge>
            </div>
            <DialogDescription className="">
              {eventData.description}
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm">
            <h2 className="font-bold">Location</h2>
            <p className="text-muted-foreground">{eventData.location}</p>
          </div>
        </DialogContent>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EventDialog;
