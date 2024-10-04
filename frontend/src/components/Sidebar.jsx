// components/DesktopSidebar.js
import { Link } from "react-router-dom";
import { Package2, Home, ShoppingCart, Package, Users, LineChart, Calendar, Newspaper, User } from "lucide-react";
import UserItem from "@/components/UserItem";

const DesktopSidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block bg-gray-900 text-gray-200">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="NavLogo.svg" className="w-48" />
            {/* <span className="">OrgConnect</span> */}
          </Link>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-lg font-base lg:px-4">
            <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Home className="h-6 w-6" />
              Home
            </Link>
            <Link to="/event" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Calendar className="h-6 w-6" />
              Calendar
            </Link>
            <Link to="/announcment" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
              <Newspaper className="h-6 w-6" />
              Announcments
            </Link>
            <Link to="/officers" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <User className="h-6 w-6" />
              Officers
            </Link>
            <Link to="/members" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Users className="h-6 w-6" />
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
