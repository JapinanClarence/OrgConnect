import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Calendar,
  Home,
  Newspaper,
  QrCode,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const location = useLocation();
  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path;
  return (
    <footer className="fixed bottom-0 left-0 w-full  ">
      <div className="py-2 px-2 border-t bg-white  grid grid-flow-row grid-cols-5 items-center relative">
        <div
          className={` ${
            isActive("/") ? "text-gray-900" : "text-muted-foreground"
          }`}
        >
          <Link to={"/"}>
            <Home className="mx-auto" />
            <span className="text-center block text-xs">Home</span>
          </Link>
        </div>
        <div
          className={`mx-auto ${
            isActive("/events") ? "text-gray-900" : "text-muted-foreground"
          }`}
        >
          <Link to={"/events"}>
            <Calendar className="mx-auto" />
            <span className="text-center block text-xs">Calendar</span>
          </Link>
        </div>
        <div
          className={`mx-auto ${
            isActive("/qr") ? "text-gray-900" : "text-muted-foreground"
          }`}
        >
          <Link to="/qr">
            <QrCode className="mx-auto " />
            <span className="text-center block text-xs">My QR</span>
          </Link>
        </div>
        <div
          className={`mx-auto ${
            isActive("/notifications")
              ? "text-gray-900"
              : "text-muted-foreground"
          }`}
        >
          <Link to={"/notifications"}>
            <Bell className="mx-auto" />
            <span className="text-center block text-xs">Notifications </span>
          </Link>
        </div>
        <div
          className={`mx-auto ${
            isActive("/profile") ? "text-gray-900" : "text-muted-foreground"
          }`}
        >
          <Link to={"/profile"}>
            <User className="mx-auto" />
            <span className="text-center block text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
