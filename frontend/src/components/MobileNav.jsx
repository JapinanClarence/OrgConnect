// components/MobileNav.js
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import UserItem from "@/components/UserItem";

const MobileNav = () => {
  return (
    <Sheet className="">
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
        className="bg-zinc-900 text-white border-zinc-500"
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
          <span className=" inline text-2xl font-semibold">OrgConnect</span>
        </div>

        <div className="grid gap-1 mt-5 font-normal text-lg">
          <Link to={"/"} className="rounded-lg hover:bg-zinc-800 p-2">
            Home
          </Link>

          <Link to={"/event"} className="rounded-lg hover:bg-zinc-800 p-2">Calendar</Link>

          <Link to={"/announcement"} className="rounded-lg hover:bg-zinc-800 p-2">Announcement</Link>

          <Link to={"/payments"} className="rounded-lg hover:bg-zinc-800 p-2">Payments</Link>

          <Link to={"/analytics"} className="rounded-lg hover:bg-zinc-800 p-2">Analytics</Link>

          <Link to={"/officer"} className="rounded-lg hover:bg-zinc-800 p-2">Officers</Link>

          <Link to={"/member"} className="rounded-lg hover:bg-zinc-800 p-2">Members</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
