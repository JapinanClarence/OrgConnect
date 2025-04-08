import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Calendar,
  CalendarRange,
  DoorOpen,
  Home,
  Newspaper,
  Notebook,
  QrCode,
  User,
  Wallet,
  Wallet2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SecondaryFooter = ({id, onLeave}) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path;
  const handleClick = (path) => {
    navigate(`/organization/${id}/${path}`);
  };
  return (
    <footer className="fixed bottom-0 left-0 w-full  ">
      <div className="py-4  border-t bg-white  grid grid-flow-row grid-cols-6 items-center relative">
        <div
          className={`mx-auto text-muted-foreground`}
          onClick={() => handleClick("events")}
        >
          <CalendarRange className="mx-auto" />
          {/* <span className="text-center block text-xs">Events</span> */}
        </div>
        <div
          className={`mx-auto text-muted-foreground`}
          onClick={() => handleClick("announcements")}
        >
          <Newspaper className="mx-auto" />
          {/* <span className="text-center block text-xs">Announcement</span> */}
        </div>
        <div
          className={`mx-auto text-muted-foreground`}
          onClick={() => handleClick("payments")}
        >
          <Wallet2 className="mx-auto" />
          {/* <span className="text-center block text-xs">Payment</span> */}
        </div>
        <div
          className={`mx-auto text-muted-foreground`}
          onClick={() => handleClick("transactions")}
        >
          <Notebook className="mx-auto" />
          {/* <span className="text-center block text-xs">Transactions</span> */}
        </div>
        <div
          className={`mx-auto text-muted-foreground`}
          onClick={() => handleClick("officers")}
        >
          <User className="mx-auto" />
          {/* <span className="text-center block text-xs">Officers</span> */}
        </div>
        <div
          className={`mx-auto text-muted-foreground`}
          onClick={() => onLeave(id)}
        >
          <DoorOpen className="mx-auto" />
          {/* <span className="text-center block text-xs">Leave</span> */}
        </div>
      </div>
    </footer>
  );
};

export default SecondaryFooter;
