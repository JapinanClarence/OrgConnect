import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Calendar, Home, Newspaper, QrCode, User, Wallet } from "lucide-react";
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full  ">
      <div className="py-2  border-t bg-white  grid grid-flow-row grid-cols-5 items-center relative">
        <div className="mx-auto text-muted-foreground">
          <Home className="mx-auto" />
          <span className="text-center block text-xs">Home</span>
        </div>
        <div className="mx-auto text-muted-foreground">
          <Calendar className="mx-auto" />
          <span className="text-center block text-xs">Calendar</span>
        </div>
        <div className="text-muted-foreground ">
          <QrCode className="mx-auto " />
          <span className="text-center block text-xs">My QR</span>
        </div>
        <div className="mx-auto text-muted-foreground">
          <Bell className="mx-auto" />
          <span className="text-center block text-xs">Notifications </span>
        </div>
        <div className="mx-auto text-muted-foreground">
          <User className="mx-auto" />
          <span className="text-center block text-xs">Profile</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
