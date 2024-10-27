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

const yearMap = {
    1: "1st Year",
    2: "2nd Year",
    3: "3rd Year",
    4: "4th Year"
}
const OfficerDialog = ({ open, onOpenChange, name, position, email, year, course }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"max-w-[380px] rounded-lg p-0"}>
        <DialogHeader className={"text-start px-5 pt-5"}>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{position}</DialogDescription>
        </DialogHeader>
        <div className="border-b border-zinc-300"></div>
        <div className="px-5 pb-5">

          <div className="my-auto grid grid-cols-[90px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Email:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{email}</div>
            </div>
          </div>
          <div className="my-auto grid grid-cols-[90px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Course:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{course}</div>
            </div>
          </div>
          <div className="my-auto grid grid-cols-[90px_1fr] text-sm">
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
