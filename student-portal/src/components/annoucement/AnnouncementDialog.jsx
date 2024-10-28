import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const AnnouncementDialog = ({
  title,
  category,
  datePosted,
  description,
  postedBy,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-8 max-w-[350px] rounded-lg">
        <DialogHeader className="text-start pb-2 border-b-[1px] border-zinc-300">
          {/* <h1 className="text-sm font-bold">Title</h1> */}
          <DialogTitle className="">{title}</DialogTitle>
          <div className="flex flex-col gap-1">
            <span className="text-xs ">{datePosted}</span>
            <div className="">
              <Badge
                className={`text-white ${category.color} hover:${category.color} flex-shrink`}
              >
                {category.name}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        <div className="p-0 space-y-2 ">
          <div>
            <h1 className="text-sm font-bold">Description</h1>
            <DialogDescription className="mt-2">
              {description}
            </DialogDescription>
          </div>
        </div>
        <DialogFooter className={"text-end"}>
          <div>
            <h1 className="text-muted-foreground text-xs">Announced by: </h1>
            <p className="text-gray-900 font-semibold text-sm">{postedBy}</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDialog;
