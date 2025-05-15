import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronDown, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userData } = useAuth();

  const handleNavigation = (path) => {
    setIsOpen(false); // Close the sheet
    navigate(path); // Redirect to the new path
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="md:hidden p-2 text-xl hover:bg-zinc-300"
          variant="ghost"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-gray-900 text-white border-zinc-500"
        aria-describedby={undefined}
      >
        <SheetTitle></SheetTitle>
        <div className="flex items-center gap-2 pb-2 border-b-[1px] border-zinc-300">
          <Link to={"/"} aria-label="Home">
            <img
              src="OrgConnect-Default.jpeg"
              className="size-10 fill-foreground rounded-lg"
            />
          </Link>
          <span className="inline text-2xl font-semibold">OrgConnect</span>
        </div>

        <div
          className={`${
            userData.role != "0" ? "grid" : "hidden"
          } gap-1 mt-5 font-normal text-lg`}
        >
          <button
            onClick={() => handleNavigation("/")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Dashboard
          </button>

          <button
            onClick={() => handleNavigation("/events")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Event
          </button>

          <button
            onClick={() => handleNavigation("/announcements")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Announcements
          </button>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <button
                className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
              >
                Financial Records 
                <ChevronDown className="h-5 w-5 inline ml-2" />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 border-l ml-4 pl-2 flex flex-col">
              <button
                onClick={() => handleNavigation("/fees")}
                className="rounded-lg text-sm hover:bg-gray-800 p-2 w-full text-left"
              >
                Collections
              </button>
              <button
                onClick={() => handleNavigation("/expenditure")}
                className="rounded-lg text-sm hover:bg-gray-800 p-2 w-full text-left"
              >
                Transactions
              </button>
              <button
                onClick={() => handleNavigation("/payment-logs")}
                className="rounded-lg text-sm hover:bg-gray-800 p-2 w-full text-left"
              >
                Payment Logs
              </button>
            </CollapsibleContent>
          </Collapsible>

          <button
            onClick={() => handleNavigation("/officers")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Officers
          </button>

          <button
            onClick={() => handleNavigation("/members")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Members
          </button>
           <button
            onClick={() => handleNavigation("/users")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            User Accounts
          </button>

        </div>
        <div
          className={`${
            userData.role == "0" ? "grid" : "hidden"
          } gap-1 mt-5 font-normal text-lg`}
        >
          <button
            onClick={() => handleNavigation("/")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Home
          </button>

          <button
            onClick={() => handleNavigation("/academicYear")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Academic Years
          </button>
          <button
            onClick={() => handleNavigation("/accounts")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Users
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
