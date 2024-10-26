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
import { CalendarRange, DoorOpen, LogOut, Newspaper, User, Wallet2 } from "lucide-react";

const OrganizationDrawer = ({ open, onOpenChange }) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {/* <DrawerTrigger>Joined</DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader className="hidden">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className=" text-zinc-800 pt-2">
          <div className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 ">
            <div className="rounded-full bg-zinc-300 p-3">
              <CalendarRange className="size-6" />
            </div>
            <div> Events</div>
          </div>
          <div className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 ">
            <div className="rounded-full bg-zinc-300 p-3">
              <Newspaper className="size-6" />
            </div>
            <div> Announcement</div>
          </div>
          <div className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 ">
            <div className="rounded-full bg-zinc-300 p-3">
              <Wallet2 className="size-6" />
            </div>{" "}
            <div> Payments</div>
          </div>
          <div className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 ">
            <div className="rounded-full bg-zinc-300 p-3">
              <User className="size-6" />
            </div>{" "}
            <div> Officers</div>
          </div>
          <div className="flex items-center gap-4 px-5 py-2 hover:bg-slate-200 ">
            <div className="rounded-full bg-zinc-300 p-3">
              <DoorOpen className="size-6" />
            </div>{" "}
            <div> Leave</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OrganizationDrawer;