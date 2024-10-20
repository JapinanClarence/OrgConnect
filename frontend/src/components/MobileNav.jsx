import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
        <div className="flex items-center pb-2 border-b-[1px] border-zinc-300">
          <Link to={"/"} aria-label="Home">
            <img
              src="OrgConnect-transparent.svg"
              className="size-12 fill-foreground"
            />
          </Link>
          <span className="inline text-2xl font-semibold">OrgConnect</span>
        </div>

        <div className="grid gap-1 mt-5 font-normal text-lg">
          <button
            onClick={() => handleNavigation("/")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Home
          </button>

          <button
            onClick={() => handleNavigation("/events")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Calendar
          </button>

          <button
            onClick={() => handleNavigation("/announcements")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Announcements
          </button>

          <button
            onClick={() => handleNavigation("/payments")}
            className="rounded-lg hover:bg-gray-800 p-2 w-full text-left"
          >
            Payments
          </button>
          <button
            onClick={() => handleNavigation("#")}
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
