import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Home, Newspaper, QrCode } from "lucide-react";
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full  z-10">
      <div className="px-5 shadow-sm py-3 bg-white border-t  grid grid-flow-row grid-cols-4 ">
        <div className="mx-auto text-muted-foreground">
          <Home className="mx-auto" />
          <span className="text-center block text-xs">Home</span>
        </div>
        <div className="mx-auto text-muted-foreground">
          <Calendar className="mx-auto" />
          <span className="text-center block text-xs">Calendar</span>
        </div>
        <div className="mx-auto text-muted-foreground">
          <QrCode className="mx-auto" />
          <span className="text-center block text-xs">Qr</span>
        </div>
        <div className="mx-auto text-muted-foreground">
          <Newspaper className="mx-auto" />
          <span className="text-center block text-xs">Announcements</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
