import {
  User,
  Users,
  MoreVertical,
  ChevronFirst,
  ChevronLast,
  Calendar,
  Newspaper,
  Settings2,
  Home,
  Gauge
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Home",
    icon: Home,
    color: "#fff",
    href: "/",
  },
  {
    name: "Dashboard",
    icon: Gauge,
    color: "#fff",
    href: "/dashboard",
  },
  { name: "Calendar", icon: Calendar, color: "#fff", href: "/events" },
  { name: "Announcments", icon: Newspaper, color: "#fff", href: "/announcment" },
  { name: "Officers", icon: User, color: "#fff", href: "/users" },
  { name: "Members", icon: Users, color: "#fff", href: "/members" },
  { name: "Settings", icon: Settings2, color: "#fff", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full  bg-gray-900 p-4 flex flex-col border-r border-gray-700">
        <div className="pb-2 flex justify-between items-center border-b">
          <img
            src="NavLogo.svg"
            className={`overflow-hidden transition-all ${
              isSidebarOpen ? "w-40" : "w-0"
            }`}
            alt=""
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? < ChevronFirst size = {24}/> : <ChevronLast size = {24}/>}
            {/* <Menu size={24} /> */}
          </motion.button>
        </div>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-light rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        <div className="border-t flex pt-2">
          <img
            src="profile.jpg"
            alt=""
            className="w-10 h-10  object-cover rounded-full"
          />
          <div
            className={`
              flex justify-between items-center gap-5
              overflow-hidden transition-all ${isSidebarOpen ? "ml-4" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-400">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Sidebar;
