import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgeInfo, Info, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const yearMap = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
};
const OfficerDialog = ({
  open,
  onOpenChange,
  name,
  position,
  email,
  year,
  course,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"max-w-[320px] rounded-lg p-0"}>
        <DialogHeader
          className={
            " text-start px-5 space-y-0 pt-5 flex-row gap-2 items-center"
          }
        >
         
          <DialogTitle className="text-lg">{name}</DialogTitle>
          <DialogDescription className="hidden">{position}</DialogDescription>
          <BadgeInfo size={18} />
        </DialogHeader>

        <div className="border-b border-zinc-300"></div>
        <div className="px-5 pb-5">
          <div className="my-auto grid grid-cols-[70px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Position:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{position}</div>
            </div>
          </div>
          <div className="my-auto grid grid-cols-[70px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Email:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{email}</div>
            </div>
          </div>
          <div className="my-auto grid grid-cols-[70px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Course:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{course}</div>
            </div>
          </div>
          <div className="my-auto grid grid-cols-[70px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Year:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{yearMap[year]}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfficerDialog;
