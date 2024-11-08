import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { dateOnly, formatSimpleDate } from "@/util/helpers";
const statusMap = {
  0: {
    name: "Pending",
    color: "bg-red-500",
  },
  1: {
    name: "Approved",
    color: "bg-green-600",
  },
};
const MemberDialog = ({ data, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"max-w-[400px]"}>
        <DialogHeader
          className={"border-b-[1px] border-zinc-300 pb-2 text-left"}
        >
          <DialogTitle>Student Profile</DialogTitle>
          <DialogDescription>
            Student personal information and contact details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-[90px_1fr]">
          <Avatar className="size-16">
            <AvatarImage src={data.profilePicture} alt="User Profile" />
            <AvatarFallback className="bg-gray-200 text-gray-400 font-bold">
              {data.fullname?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="leading-[1px] my-auto">
            <h1 className="font-bold text-lg">{data.fullname} </h1>
            <span className="text-xs text-muted-foreground">
              {data.studentId}
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2 border-b border-zinc-300">
            Basic Information
          </div>
          <div className="my-auto grid grid-cols-[90px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Birthday:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{data.birthday ? formatSimpleDate(data.birthday) : ""}</div>
            </div>
          </div>
          <div className="my-auto grid grid-cols-[90px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Gender:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{data.gender}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-2 border-b border-zinc-300">
            Contact Information
          </div>
          <div className="my-auto grid grid-cols-[90px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Contact:</div>
              <div>Email:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{data.contact}</div>
              <div>{data.email}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2 border-b border-zinc-300">
            Academic Information
          </div>
          <div className="my-auto grid grid-cols-[90px_1fr] text-sm">
            <div className="text-muted-foreground space-y-1">
              <div>Course:</div>
              <div>Year:</div>
            </div>
            <div className="font-semibold space-y-1">
              <div>{data.course}</div>
              <div>{data.year}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDialog;
