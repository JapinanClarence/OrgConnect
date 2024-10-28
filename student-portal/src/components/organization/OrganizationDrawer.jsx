import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  CalendarRange,
  DoorOpen,
  LogOut,
  Newspaper,
  User,
  Wallet2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrganizationDrawer = ({ open, onOpenChange, id, onLeave }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(`/organization/${id}/${path}`);
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {/* <DrawerTrigger>Joined</DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className=" text-zinc-800 pt-2 font-medium">
          <div
            className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200"
            onClick={() => handleClick("events")}
          >
            <div className="rounded-full bg-zinc-300 p-3">
              <CalendarRange className="size-5" />
            </div>
            <div> Events</div>
          </div>
          <div className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 " onClick={() => handleClick("announcements")}>
            <div className="rounded-full bg-zinc-300 p-3">
              <Newspaper className="size-5" />
            </div>
            <div> Announcements</div>
          </div>
          <div
            className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 "
            onClick={() => handleClick("payments")}
          >
            <div className="rounded-full bg-zinc-300 p-3">
              <Wallet2 className="size-5" />
            </div>{" "}
            <div> Payments</div>
          </div>
          <div
            className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 "
            onClick={() => handleClick("officers")}
          >
            <div className="rounded-full bg-zinc-300 p-3">
              <User className="size-5" />
            </div>{" "}
            <div> Officers</div>
          </div>
          <div
            className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 "
            onClick={onLeave}
          >
            <div className="rounded-full bg-zinc-300 p-3">
              <DoorOpen className="size-5" />
            </div>{" "}
            <div> Leave</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OrganizationDrawer;
