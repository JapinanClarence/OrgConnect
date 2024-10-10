// components/DesktopSidebar.js
import { Link } from "react-router-dom";
import { Package2, Home, ShoppingCart, Package, Users, LineChart, Calendar, Newspaper, User } from "lucide-react";
import UserItem from "@/components/UserItem";

const DesktopSidebar = () => {
  return (
    <div className="hidden border-r md:block bg-gray-900 text-gray-200 z-10">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="OrgConnect-transparent.svg" className="w-9" />
            {/* <span className="">OrgConnect</span> */}
          </Link>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-md font-base lg:px-4">
            <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all">
              <Home size={20}/>
              Home
            </Link>
            <Link to="/event" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all">
              <Calendar size={20}/>
              Calendar
            </Link>
            <Link to="/announcement" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all">
              <Newspaper size={20}/>
              Announcements
            </Link>
            <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all">
              <User size={20}/>
              Officers
            </Link>
            <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all">
              <Users size={20}/>
              Members
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-4">
          <UserItem />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
