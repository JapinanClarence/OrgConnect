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

const ProfileDrawer = ({ open, onOpenChange, onConfirm }) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {/* <DrawerTrigger>Joined</DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Log out?</DrawerTitle>
          <DrawerDescription> Are you sure you want to logout.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter >
          <Button onClick={onConfirm}>Log out</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
