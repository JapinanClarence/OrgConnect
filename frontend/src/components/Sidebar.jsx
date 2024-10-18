import { Link, useLocation } from "react-router-dom";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Calendar,
  Newspaper,
  User,
  Users,
  SquareTerminal,
  MoreVertical,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import UserProfile from "./UserProfile";

const DesktopSidebar = () => {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const location = useLocation();
  const { logout, userData } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path;

  const fullname = `${userData.firstname} ${
    userData.middlename ? userData.middlename[0] + ". " : ""
  }${userData.lastname}`;
  return (
    <aside
      className={`fixed left-0 h-full flex-col border-r hidden md:flex lg:w-64 text-white bg-gray-900 z-20`}
    >
      <div className="border-b border-zinc-500 flex justify-start items-center py-2 px-4">
        <Link to={"/"} aria-label="Home">
          <img
            src="OrgConnect-transparent.svg"
            className="size-9 fill-foreground"
          />
        </Link>
        <span className="ml-2 hidden text-xl font-semibold lg:block">
          OrgConnect
        </span>
      </div>

      <nav className="grid gap-1 pt-2 px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className={`rounded-lg size-full flex items-center justify-start p-2 ${
                  isActive("/") ? "bg-white text-zinc-900" : "hover:bg-gray-800"
                }`}
              >
                <Home />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Home
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Home
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/events"
                className={`rounded-lg size-full flex items-center justify-start p-2 ${
                  isActive("/events")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Calendar />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Calendar
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Calendar
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/announcements"
                className={`rounded-lg size-full flex items-center justify-start p-2 ${
                  isActive("/announcements")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Newspaper />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Announcements
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Announcements
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/payments"
                className={`rounded-lg size-full flex items-center justify-start p-2 ${
                  isActive("/payments")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Wallet />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Payments
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Payments
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/members"
                className={`rounded-lg size-full flex items-center justify-start p-2 ${
                  isActive("/members")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Users />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Members
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Members
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/officers"
                className={`rounded-lg size-full flex items-center justify-start p-2 ${
                  isActive("/officers")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <User />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Officers
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Officers
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className={`rounded-lg size-full flex items-center justify-start p-2 ${
                  isActive("/analytics")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <SquareTerminal />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Analytics
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Analytics
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="mt-auto grid gap-1 p-3 border-t-[1px] border-gray-500">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="">
                <div className="flex items-center lg:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer size-10">
                        <AvatarFallback className="text-gray-500">
                          AD
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="bg-white">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => setShowUserDialog(true)}
                      >
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="hidden lg:flex items-center">
                  <Avatar className="size-10">
                    <AvatarFallback className="text-gray-500">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:inline lg:ml-3 text-sm font-bold">
                    {fullname}{" "}
                    <span className="font-normal">{userData.email}</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="hidden lg:inline w-min mr-0 ml-auto p-0 bg-inherit hover:bg-transparent"
                        size="icon"
                      >
                        <MoreVertical size={23} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setShowUserDialog(true)}>
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-zinc-900"
              side="right"
              sideOffset={5}
            >
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <UserProfile open={showUserDialog} onOpenChange={setShowUserDialog} />
    </aside>
  );
};

export default DesktopSidebar;
