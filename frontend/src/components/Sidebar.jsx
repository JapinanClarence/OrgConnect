import { Link, useLocation, useNavigate } from "react-router-dom";
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
  UserPlus,
  Building2,
  User2,
  BookA,
  CalendarDays,
  ChevronDown,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const DesktopSidebar = () => {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const location = useLocation();
  const { logout, userData } = useAuth();
  const navigate = useNavigate();
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
            src="OrgConnect-Default.jpeg"
            className="size-9 fill-foreground rounded-lg"
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
                className={`${
                  userData.role != "0" ? "hidden" : "flex"
                } rounded-lg size-full  items-center justify-start p-2 ${
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
                to="/organizations"
                className={`${
                  userData.role != "0" ? "hidden" : "flex"
                } rounded-lg size-full  items-center justify-start p-2 ${
                  isActive("/organizations")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Building2 />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Organizations
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Organizations
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/academicYear"
                className={`${
                  userData.role != "0" ? "hidden" : "flex"
                } rounded-lg size-full  items-center justify-start p-2 ${
                  isActive("/academicYear")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <BookA />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Academic Years
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Academic Years
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/accounts"
                className={`${
                  userData.role != "0" ? "hidden" : "flex"
                } rounded-lg size-full  items-center justify-start p-2 ${
                  isActive("/accounts")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Users />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Users
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Users
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className={`${
                  userData.role == "0" ? "hidden" : "flex"
                } rounded-lg size-full  items-center justify-start p-2 ${
                  isActive("/") ? "bg-white text-zinc-900" : "hover:bg-gray-800"
                }`}
              >
                <SquareTerminal />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Dashboard
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Dashboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/events"
                className={`${
                  userData.role == "0" ? "hidden" : "flex"
                } rounded-lg size-full  items-center justify-start p-2 ${
                  isActive("/events")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Calendar />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Event
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Event
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/calendar"
                className={`${
                  userData.role == "0" ? "hidden" : "flex"
                } rounded-lg size-full  items-center justify-start p-2 ${
                  isActive("/calendar")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <CalendarDays />
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
                className={`${
                  userData.role == "0" ? "hidden" : "flex"
                } rounded-lg size-full items-center justify-start p-2 ${
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
              {/* <Link
                to="/payments"
                className={` ${
                  userData.role == "0" ? "hidden" : "flex"
                } rounded-lg size-full items-center justify-start p-2 ${
                  isActive("/payments")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <Wallet/>
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  Financial Records
                </span>
              </Link> */}
              <Collapsible
                className={`${userData.role == "0" ? "hidden" : ""}`}
              >
                <CollapsibleTrigger asChild>
                  <div className="inline-flex items-center justify-start p-2 w-full rounded-lg hover:bg-gray-800">
                    <Wallet />
                    <span className="hidden lg:block ml-2 font-bold text-sm">
                      Financial Records
                    </span>
                    <ChevronDown className="ml-2 hidden lg:flex" size={20} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 border-l ml-4 pl-2 mb-2 flex flex-col">
                  <Link
                    to={"/fees"}
                    className={`rounded-md p-2 text-sm ${
                      isActive("/fees")
                        ? "bg-gray-600 text-white"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    Collections
                  </Link>
                  <Link
                    to={"/expenditure"}
                    className={`rounded-md p-2 text-sm ${
                      isActive("/expenditure")
                        ? "bg-gray-600 text-white"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    Transactions
                  </Link>

                  <Link
                    to={"/payment-logs"}
                    className={`rounded-md p-2 text-sm ${
                      isActive("/payment-logs")
                        ? "bg-gray-600 text-white"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    Payment Logs
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </TooltipTrigger>
            <TooltipContent
              className="lg:hidden bg-white text-gray-900"
              side="right"
              sideOffset={5}
            >
              Financial Records
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/members"
                className={`${
                  userData.role == "0" ? "hidden" : "flex"
                }  rounded-lg size-full items-center justify-start p-2 ${
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
                className={`${
                  userData.role == "0" ? "hidden" : "flex"
                } rounded-lg size-full items-center justify-start p-2 ${
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
                to="/users"
                className={`${
                  userData.role == "0" ? "hidden" : "flex"
                } rounded-lg size-full items-center justify-start p-2 ${
                  isActive("/users")
                    ? "bg-white text-zinc-900"
                    : "hover:bg-gray-800"
                }`}
              >
                <UserCog />
                <span className="hidden lg:block ml-2 font-bold text-sm">
                  User Accounts
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
                        <AvatarImage src={userData.profilePicture} />
                        <AvatarFallback className="text-gray-500">
                          {userData.username[0] + userData.username[1]}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="bg-white">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => navigate("/settings")}>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="hidden lg:flex items-center">
                  <Avatar className="size-10">
                    <AvatarImage src={userData.profilePicture} />
                    <AvatarFallback className="text-gray-500">
                      {userData.username[0] + userData.username[1]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:inline lg:ml-3 text-sm font-bold">
                    {userData.username}{" "}
                    <p className="font-normal">{userData.email}</p>
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
                      <DropdownMenuItem onClick={() => navigate("/settings")}>
                        Settings
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
    </aside>
  );
};

export default DesktopSidebar;
